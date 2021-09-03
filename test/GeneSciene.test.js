const { expect } = require('chai');

const GeneScience = artifacts.require('./GeneScience.sol');

contract('GeneScience', (accounts) => {
    let contract;

    before(async () => {
        contract = await GeneScience.deployed();
    });

    describe('deployment', () => {
        it('deploys successfully', () => {
            const address = contract.address;

            // Contract address is not empty or the null address
            expect(address).to.not.be.empty;
            expect(address).to.not.be.equal(0x0);
        });
    });

    // TODO test mixGenes
});
