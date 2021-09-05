const { expect } = require("chai");
const { expectThrowsAsync } = require("./common/helpers");

const KittyCore = artifacts.require('./KittyCore.sol');

/**
 * Test KittyMinting abstract contract by deploying the KittyCore contract
 */
contract('KittyMinting', (accounts) => {
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

    describe('createPromoKitty', () => {
        it('should create a new kitty', async () => {
            const result = await contract.createPromoKitty(
                '0x0000000000000000000000000000000000000000000000000000000000000001',
                '0x0000000000000000000000000000000000000000', // Assign to COO
            );

           const birthEvent = result.logs[0];
           const transferEvent = result.logs[1];

           expect(birthEvent.event).to.be.equal('Birth');
           expect(birthEvent.args.kittyId).to.be.bignumber.equal('1');
           expect(birthEvent.args.matronId).to.be.bignumber.equal('0');
           expect(birthEvent.args.sireId).to.be.bignumber.equal('0');
           expect(birthEvent.args.genes).to.be.bignumber.equal('1');

           expect(transferEvent.event).to.be.equal('Transfer');
           expect(transferEvent.args.from).to.be.equal('0x0000000000000000000000000000000000000000');
           expect(transferEvent.args.to).to.be.equal(accounts[0]);
           expect(transferEvent.args.tokenId).to.be.bignumber.equal('1');
        });

        it('does not allow the same kitty to be generated', async () => {
            const kittyGenes = '0x0000000000000000000000000000000000000000000000000000000000000010';

            await contract.createPromoKitty(
                kittyGenes,
                '0x0000000000000000000000000000000000000000', // Assign to COO
            );

            await expectThrowsAsync(() => contract.createPromoKitty(
                kittyGenes,
                '0x0000000000000000000000000000000000000000', // Assign to COO
            ));
        });

        it('non-COO can\'t create kitty', async () => {
            await expectThrowsAsync(() => contract.createPromoKitty(
                '0x0000000000000000000000000000000000000000000000000000000000000001',
                '0x0000000000000000000000000000000000000000', // Assign to COO
                { from : accounts[1] } // Not the COO
            ));
        });
    });

    // TODO test Gen 0 Auction
});