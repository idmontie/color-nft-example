const KittyCore = artifacts.require("KittyCore");

module.exports = async function(deployer) {
  await deployer.deploy(KittyCore);
};
