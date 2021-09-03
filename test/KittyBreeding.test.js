
const KittyCore = artifacts.require('./KittyCore.sol');
const GeneScience = artifacts.require('./GeneScience.sol');
const { expectThrowsAsync, expectNotThrowsAsync } = require('./common/helpers');

/**
 * Test KittyBreeding abstract contract by deploying the KittyCore contract
 */
contract('KittyBreeding', (accounts) => {
    let contract;
    let geneContract;

    before(async () => {
        contract = await KittyCore.deployed();
        geneContract = await GeneScience.deployed();
    });

    describe('deployment', () => {
        // Sanity check, not really necessary since KittyCore.test.js will take care
        // of this test
        it('deploys successfully', () => {
            const address = contract.address;

            // Contract address is not empty or the null address
            expect(address).to.not.be.empty;
            expect(address).to.not.be.equal(0x0);
        });
    });

    describe('setGeneScienceAddress', () => {
        it('fails if a non-CEO calls the function', async () => {
            const address = geneContract.address;
            await expectThrowsAsync(() => contract.setGeneScienceAddress(address, {
                from: accounts[1],
            }));
        });

        it('succeeds if the CEO calls the function', async () => {
            const address = geneContract.address;
            await expectNotThrowsAsync(() => contract.setGeneScienceAddress(address));
        });

        it('fails if the gene science address is not a valid contract', async () => {
            const address = '0xeFD0BD449180Addc538c7a3d6EEdf2B1b4FB7Bdb';
            await expectThrowsAsync(() => contract.setGeneScienceAddress(address));
        });
    });

    
    // TODO test approveSiring

    // TODO test setAutoBirthFee

    // TODO test isReadyToBreed

    // TODO test isPregnant

    // TODO test canBreedWith

    // TODO test breedWithAuto

    // TODO test giveBirth
});