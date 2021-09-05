
const KittyCore = artifacts.require('./KittyCore.sol');

/**
 * Test KittyAuction abstract contract by deploying the KittyCore contract
 */
contract('KittyAuction', (accounts) => {
    let contract;

    before(async () => {
        contract = await KittyCore.deployed();
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

    // TODO test setSaleAuctionAddress

    // TODO test setSiringAuctionAddress

    // TODO test createSaleAuction

    // TODO test createSiringAuction

    // TODO test bidOnSiringAuction

    // TODO test withdrawAuctionBalances
    
});