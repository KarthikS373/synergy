//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IShare} from "./interfaces/IShare.sol";
import {IMembership} from "./interfaces/IMembership.sol";
import {IModule} from "./interfaces/IModule.sol";
import {DataTypes} from "./libraries/DataTypes.sol";
import {Errors} from "./libraries/Errors.sol";
import {Events} from "./libraries/Events.sol";

contract FractionalInvestment is TimelockController, Multicall {
    using Address for address payable;

    address public immutable share;
    address public immutable membership;
    DataTypes.ShareSplit public shareSplit;
    DataTypes.InvestmentSettings public investmentSettings;

    address[] private _proposers;
    address[] private _executors = [address(0)];
    mapping(address => uint256) private _investThresholdInERC20;
    mapping(address => uint256) private _investRatioInERC20;
    mapping(address => DataTypes.ModulePayment) private _modulePayments;

    constructor(
        uint256 timelockDelay,
        address membershipTokenAddress,
        address shareTokenAddress,
        DataTypes.InvestmentSettings memory settings
    ) TimelockController(timelockDelay, _proposers, _executors) {
        membership = membershipTokenAddress;
        share = shareTokenAddress;
        investmentSettings = settings;
        _mappingSettings(settings);
    }

    modifier investmentEnabled() {
        if (!investmentSettings.enableInvestment)
            revert Errors.InvestmentDisabled();
        _;
    }

    function vestingShare(
        uint256[] calldata tokenId,
        uint8[] calldata shareRatio
    ) public onlyRole(TIMELOCK_ADMIN_ROLE) {
        uint256 _shareTreasury = IShare(share).balanceOf(address(this));

        if (_shareTreasury == 0) revert Errors.NoShareInTreasury();

        uint256 _membersShare = _shareTreasury * (shareSplit.members / 100);

        if (_membersShare == 0) revert Errors.NoMembersShareToVest();

        for (uint256 i = 0; i < tokenId.length; i++) {
            address _member = IMembership(membership).ownerOf(tokenId[i]);
            IShare(share).transfer(
                _member,
                (_membersShare * shareRatio[i]) / 100
            );
        }
    }

    function updateInvestmentSettings(
        struct InvestmentSettings {
                uint256 investRatioInETH;
                uint256 investThresholdInETH;
                address[] investInERC20;
                uint256[] investRatioInERC20;
                uint256[] investThresholdInERC20;
            }

            struct ShareSplit {
                uint256 daoShare;
                uint256 memberShare;
            }

            struct ModulePayment {
                bool approved;
                uint256 eth;
                mapping(address => uint256) erc20;
            }

            InvestmentSettings public investmentSettings;
            ShareSplit public shareSplit;
            mapping(address => ModulePayment) private modulePayments;
            mapping(address => uint256) private investRatioInERC20;
            mapping(address => uint256) private investThresholdInERC20;

            function updateInvestmentSettings(InvestmentSettings memory _settings) public onlyRole(TIMELOCK_ADMIN_ROLE) {
                investmentSettings = _settings;
                _mapInvestmentSettings(_settings);
            }

            function updateShareSplit(ShareSplit memory _shareSplit) public onlyRole(TIMELOCK_ADMIN_ROLE) {
                shareSplit = _shareSplit;
            }

            function invest() external payable investmentEnabled {
                if (investmentSettings.investRatioInETH == 0)
                    revert Errors.InvestmentDisabled();

                if (msg.value < investmentSettings.investThresholdInETH)
                    revert Errors.InvestmentThresholdNotMet(
                        investmentSettings.investThresholdInETH
                    );

                _invest(
                    msg.value / investmentSettings.investRatioInETH,
                    address(0),
                    msg.value
                );
            }

            function investInERC20(address _token) external investmentEnabled {
                if (investRatioInERC20[_token] == 0)
                    revert Errors.InvestmentInERC20Disabled(_token);

                uint256 _ratio = investRatioInERC20[_token];

                if (_ratio == 0) revert Errors.InvestmentInERC20Disabled(_token);

                uint256 _threshold = investThresholdInERC20[_token];
                uint256 _allowance = IShare(_token).allowance(
                    _msgSender(),
                    address(this)
                );

                if (_allowance < _threshold)
                    revert Errors.InvestmentInERC20ThresholdNotMet(_token, _threshold);

                IShare(_token).transferFrom(_msgSender(), address(this), _allowance);
                _invest(_allowance / _ratio, _token, _allowance);
            }

            function pullModulePayment(
                uint256 _eth,
                address[] calldata _tokens,
                uint256[] calldata _amounts
            ) public {
                if (_tokens.length != _amounts.length)
                    revert Errors.InvalidTokenAmounts();

                address _moduleAddress = _msgSender();
                if (IModule(_moduleAddress).membership() != membership)
                    revert Errors.NotMember();

                ModulePayment storage _payments = modulePayments[_moduleAddress];
                address _timelock = address(IModule(_moduleAddress).timelock());
                address payable _target = payable(_timelock);

                if (!_payments.approved) revert Errors.ModuleNotApproved();

                if (_eth > 0) {
                    if (_eth > _payments.eth) revert Errors.NotEnoughETH();
                    _payments.eth -= _eth;
                    _target.sendValue(_eth);
                }

                for (uint256 i = 0; i < _tokens.length; i++) {
                    IERC20 _token = IERC20(_tokens[i]);
                    if (_token.allowance(address(this), _timelock) < _amounts[i])
                        revert Errors.NotEnoughTokens();

                    _token.transferFrom(address(this), _timelock, _amounts[i]);
                    _payments.erc20[_tokens[i]] -= _amounts[i];
                }

                emit Events.ModulePaymentPulled(
                    _moduleAddress,
                    _eth,
                    _tokens,
                    _amounts,
                    block.timestamp
                );
            }

            function approveModulePayment(
                address _moduleAddress,
                uint256 _eth,
                address[] calldata _tokens,
                uint256[] calldata _amounts
            ) public onlyRole(TIMELOCK_ADMIN_ROLE) {
                if (_tokens.length != _amounts.length)
                    revert Errors.InvalidTokenAmounts();
                if (IModule(_moduleAddress).membership() != membership)
                    revert Errors.NotMember();

                ModulePayment storage _payments = modulePayments[_moduleAddress];

                _payments.approved = true;
                _payments.eth = _eth;

                for (uint256 i = 0; i < _tokens.length; i++) {
                    IERC20 _token = IERC20(_tokens[i]);
                    if (_token.balanceOf(address(this)) < _amounts[i])
                        revert Errors.NotEnoughTokens();

                    _payments.erc20[_tokens[i]] = _amounts[i];
                    _token.approve(
                        address(IModule(_moduleAddress).timelock()),
                        _amounts[i]
                    );
                }

                emit Events.ModulePaymentApproved(
                    _moduleAddress,
                    _eth,
                    _tokens,
                    _amounts,
                    block.timestamp
                );
            }

            function _invest(
                uint256 _shareTobeClaimed,
                address _token,
                uint256 _amount
            ) private {
                uint256 _shareTreasury = IShare(share).balanceOf(address(this));

                if (_shareTreasury < _shareTobeClaimed) {
                    IShare(share).mint(
                        address(this),
                        _shareTobeClaimed - _shareTreasury
                    );
                }

                IShare(share).transfer(_msgSender(), _shareTobeClaimed);
                IMembership(membership).investMint(_msgSender());

                if (_token == address(0)) {
                    emit Events.InvestInETH(_msgSender(), msg.value, _shareTobeClaimed);
                } else {
                    emit Events.InvestInERC20(
                        _msgSender(),
                        _token,
                        _amount,
                        _shareTobeClaimed
                    );
                }
            }

            function _mapInvestmentSettings(
                InvestmentSettings memory _settings
            ) private {
                if (_settings.investInERC20.length > 0) {
                    for (uint256 i = 0; i < _settings.investInERC20.length; i++) {
                        address _token = _settings.investInERC20[i];
                        investThresholdInERC20[_token] = _settings
                            .investThresholdInERC20[i];
                        investRatioInERC20[_token] = _settings.investRatioInERC20[i];
                    }
                }
            }
        }
