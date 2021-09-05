const GeneScience = artifacts.require("GeneScience");
const KittyCore = artifacts.require("KittyCore");

module.exports = async function(deployer) {
    const geneScience = await GeneScience.deployed();
    const kittyCore = await KittyCore.deployed();
    
    await kittyCore.setGeneScienceAddress(geneScience.address);
};
