const { testArgs } = require("../utils/configs");
const { roles } = require("../utils/helpers");
const { MINTER_ROLE, PAUSER_ROLE, DEFAULT_ADMIN_ROLE } = roles;

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const share = await deployments.get("Share");
  const membership = await deployments.get("Membership");
  const settings = testArgs()[2];

  const treasury = await deploy("Investment", {
    from: deployer,
    args: [
      settings.timelockDelay,
      membership.address,
      share.address,
      settings.investment,
    ],
    log: true,
  });

  if (settings.share.initialSupply > 0) {
    await execute(
      "Share",
      { from: deployer },
      "mint",
      treasury.address,
      settings.share.initialSupply
    );
    await execute(
      "Investment",
      { from: deployer },
      "updateShareSplit",
      settings.share.initialSplit
    );
  }

  await execute(
    "Membership",
    { from: deployer },
    "grantRole",
    DEFAULT_ADMIN_ROLE,
    treasury.address
  );
  await execute(
    "Share",
    { from: deployer },
    "grantRole",
    DEFAULT_ADMIN_ROLE,
    treasury.address
  );
  await execute(
    "Share",
    { from: deployer },
    "grantRole",
    MINTER_ROLE,
    treasury.address
  );
  await execute(
    "Share",
    { from: deployer },
    "grantRole",
    PAUSER_ROLE,
    treasury.address
  );
  await execute(
    "Share",
    { from: deployer },
    "revokeRole",
    MINTER_ROLE,
    deployer
  );
  await execute(
    "Share",
    { from: deployer },
    "revokeRole",
    PAUSER_ROLE,
    deployer
  );
  await execute(
    "Share",
    { from: deployer },
    "revokeRole",
    DEFAULT_ADMIN_ROLE,
    deployer
  );

  if (!settings.membership.enableMembershipTransfer) {
    await execute("Membership", { from: deployer }, "pause");
  }

  await execute(
    "Membership",
    { from: deployer },
    "revokeRole",
    PAUSER_ROLE,
    deployer
  );
};

module.exports.tags = ["Investment"];
module.exports.dependencies = ["Share", "Membership"];
