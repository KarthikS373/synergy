const { ethers } = require("hardhat");
const { testArgs } = require("../utils/configs");
const { roles } = require("../utils/helpers");
const { PROPOSER_ROLE, TIMELOCK_ADMIN_ROLE, DEFAULT_ADMIN_ROLE } = roles;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const share = await deployments.get("Share");
  const membership = await deployments.get("Membership");
  const fractional = await deployments.get("FractionalInvestment");
  const Membership = await ethers.getContract("Membership");
  const settings = testArgs()[2];
  const name = await Membership.name();

  const membershipGovernor = await deploy("MembershipGovernor", {
    contract: "TresuryGovernor",
    from: deployer,
    args: [
      name + "-MembershipGovernor",
      membership.address,
      fractional.address,
      settings.membership.governor,
    ],
    log: true,
  });

  const shareGovernor = await deploy("ShareGovernor", {
    contract: "fractionalGovernor",
    from: deployer,
    args: [
      name + "-ShareGovernor",
      share.address,
      fractional.address,
      settings.share.governor,
    ],
    log: true,
  });

  // Setup governor roles
  // Both membership and share governance have PROPOSER_ROLE by default
  await execute(
    "FractionalInvestment",
    { from: deployer },
    "grantRole",
    PROPOSER_ROLE,
    membershipGovernor.address
  );
  await execute(
    "FractionalInvestment",
    { from: deployer },
    "grantRole",
    PROPOSER_ROLE,
    shareGovernor.address
  );

  // Revoke `TIMELOCK_ADMIN_ROLE` from this deployer
  await execute(
    "FractionalInvestment",
    { from: deployer },
    "revokeRole",
    TIMELOCK_ADMIN_ROLE,
    deployer
  );

  // Setup governor roles for the DAO
  await execute(
    "Membership",
    { from: deployer },
    "setupGovernor",
    share.address,
    fractional.address,
    membershipGovernor.address,
    shareGovernor.address
  );

  // Revoke other roles from this deployer
  // reserved the INVITER_ROLE case we need it to modify the allowlist by a non-admin deployer address.
  await execute(
    "Membership",
    { from: deployer },
    "revokeRole",
    DEFAULT_ADMIN_ROLE,
    deployer
  );
};

module.exports.tags = ["Governors"];
module.exports.dependencies = ["Share", "Membership", "FractionalInvestment"];
module.exports.runAtTheEnd = true;
