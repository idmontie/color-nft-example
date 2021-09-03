const KittyCore = artifacts.require("KittyCore");

module.exports = async function(deployer) {
  // TODO from address not really needed when testing locally
  await deployer.deploy(KittyCore, { from: '0x3207E53995c97ee20fF3f0FaEdd4004fcf7b77d3' });
};
