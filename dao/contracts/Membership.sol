//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Context.sol";

import {DataTypes} from "./libraries/DataTypes.sol";
import {Errors} from "./libraries/Errors.sol";
import {Events} from "./libraries/Events.sol";

contract Membership is
    Context,
    AccessControlEnumerable,
    Pausable,
    ERC721Enumerable,
    ERC721Burnable,
    ERC721Votes
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    address public treasury;
    address public governor;
    address public shareToken;
    address public shareGovernor;

    bytes32 public constant PAUSER_ROLE =
        0xb299b227a4e9dB812f647dc356D33A583Ae45160;
    bytes32 public constant INVITER_ROLE =
        0xb299b227a4e9dB812f647dc356D33A583Ae45160;

    string private _baseTokenURI;
    string private _contractURI;
    bytes32 private _merkleTreeRoot;
    Counters.Counter private _tokenIdTracker;
    mapping(uint256 => string) private _decentralizedStorage;
    pragma solidity ^0.8.0;

    import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "@openzeppelin/contracts/security/Pausable.sol";
    import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
    import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
    import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
    import "./EIP712.sol";
    import "./DataTypes.sol";
    import "./Errors.sol";
    import "./Events.sol";

    contract Membership is ERC721, ERC721Enumerable, ERC721Votes, EIP712, AccessControlEnumerable, Pausable, Ownable {
        using EnumerableSet for EnumerableSet.AddressSet;

        EnumerableSet.AddressSet private _inviterList;
        mapping(uint256 => bool) private _isInvestor;
        mapping(uint256 => string) private _decentralizedStorage;
        mapping(address => bool) private _isWhitelisted;

        string private _baseTokenURI;
        string private _contractURI;
        uint256 private _tokenIdTracker;
        bytes32 private _merkleTreeRoot;

        address public shareToken;
        address public treasury;
        address public governor;
        address public shareGovernor;

        bytes32 public constant INVITER_ROLE = keccak256("INVITER_ROLE");
        bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

        constructor(
            DataTypes.BaseToken memory baseToken,
            string memory baseTokenURI,
            string memory contractURI
        ) ERC721(baseToken.name, baseToken.symbol) EIP712(baseToken.name, "1") {
            _baseTokenURI = baseTokenURI;
            _contractURI = contractURI;

            _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
            _setupRole(PAUSER_ROLE, _msgSender());
            _setupRole(INVITER_ROLE, _msgSender());
        }

        function getMembershipTokenURI(uint256 tokenId) public view override returns (string memory) {
            require(_exists(tokenId), Errors.ERC721METADATA_NONEXIST_TOKEN);

            string memory baseURI = _baseURI();

            if (bytes(_decentralizedStorage[tokenId]).length > 0) {
                return string(abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(_decentralizedStorage[tokenId]))));
            }

            return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
        }

        function isInvestor(uint256 tokenId) public view returns (bool) {
            return _isInvestor[tokenId];
        }

        function setupGovernor(
            address shareTokenAddress,
            address treasuryAddress,
            address governorAddress,
            address shareGovernorAddress
        ) public onlyRole(DEFAULT_ADMIN_ROLE) {
            shareToken = shareTokenAddress;
            treasury = treasuryAddress;
            governor = governorAddress;
            shareGovernor = shareGovernorAddress;
        }

        function mint(bytes32[] calldata proof) public {
            require(!_isWhitelisted[_msgSender()], Errors.MembershipAlreadyClaimed());
            require(MerkleProof.verify(proof, _merkleTreeRoot, keccak256(abi.encodePacked(_msgSender()))), Errors.InvalidProof());

            _mint(_msgSender(), _tokenIdTracker);
            _tokenIdTracker++;
            _isWhitelisted[_msgSender()] = true;
        }

        function investMint(address to) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
            if (_isWhitelisted[to]) {
                uint256 tokenId = tokenOfOwnerByIndex(to, 0);
                _isInvestor[tokenId] = true;
                emit Events.InvestorAdded(to, tokenId, block.timestamp);
                return tokenId;
            }

            uint256 tokenId = _tokenIdTracker;
            _mint(to, tokenId);
            _isInvestor[tokenId] = true;
            emit Events.InvestorAdded(to, tokenId, block.timestamp);
            _tokenIdTracker++;
            _isWhitelisted[to] = true;
            return tokenId;
        }

        function updateTokenURI(uint256 tokenId, string calldata dataURI) public {
            require(_exists(tokenId), Errors.ERC721METADATA_UPDATE_NONEXIST_TOKEN);
            require(ownerOf(tokenId) == _msgSender(), Errors.ERC721METADATA_UPDATE_UNAUTH);

            _decentralizedStorage[tokenId] = dataURI;
        }

        function updateAllowlist(bytes32 merkleTreeRoot_) public {
            require(hasRole(INVITER_ROLE, _msgSender()), Errors.NotInviter());

            _merkleTreeRoot = merkleTreeRoot_;
        }

        function pause() public {
            require(hasRole(PAUSER_ROLE, _msgSender()), Errors.NotPauser());

            _pause();
        }

        function unpause() public {
            require(hasRole(PAUSER_ROLE, _msgSender()), Errors.NotPauser());

            _unpause();
        }

        function _baseURI() internal view override returns (string memory) {
            return _baseTokenURI;
        }

        function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721, ERC721Enumerable, Pausable) {
            super._beforeTokenTransfer(from, to, tokenId);

            if (from != address(0) && paused()) {
                revert Errors.TokenTransferWhilePaused();
            }
        }

        function _afterTokenTransfer(address from, address to, uint256 tokenId) internal virtual override(ERC721, ERC721Votes) {
            super._afterTokenTransfer(from, to, tokenId);
        }

        function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControlEnumerable, ERC721, ERC721Enumerable, ERC721Votes) returns (bool) {
            return super.supportsInterface(interfaceId);
        }
    }
}