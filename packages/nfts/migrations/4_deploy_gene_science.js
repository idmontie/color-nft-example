const GeneScience = artifacts.require("GeneScience");

module.exports = async function(deployer) {
  await deployer.deploy(GeneScience);
};
