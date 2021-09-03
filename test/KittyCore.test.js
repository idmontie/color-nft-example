const { expect } = require('chai');
const { expectThrowsAsync, expectNotThrowsAsync } = require('./common/helpers');

const KittyCore = artifacts.require('./KittyCore.sol');

contract('KittyCore', (accounts) => {
    let contract;

    before(async () => {
        contract = await KittyCore.deployed();
    });

    describe('deployment', () => {
        it('deploys successfully', async () => {
            const address = contract.address;

            // Contract address is not empty or the null address
            expect(address).to.not.be.empty;
            expect(address).to.not.be.equal(0x0);
        });

        it('has a name', async () => {
            const name = await contract.name();

            // Contract name is not empty
            expect(name).to.not.be.empty;
            expect(name).to.be.equal('CryptoKitties');
        });

        it('has a symbol', async () => {
            const symbol = await contract.symbol();

            // Contract symbol is not empty
            expect(symbol).to.not.be.empty;
            expect(symbol).to.be.equal('CK');
        });
    });

    describe('safe guards', () => {
        it('rejects all transfers', async () => {
            // Attempt to transfer ETH to the contract
            await expectThrowsAsync(() => contract.sendTransaction({ from: accounts[0], value: 10000 }));
        });

        it('can not unpause if gene science contractis not set', async () => {
            await expectThrowsAsync(() => contract.unpause());
        });

        // TODO need to set geneScience before unpause
        // it('can unpause if no new contract is set', async () => {
        //     // TODO set geneScience before unpause
        //     await expectNotThrowsAsync(() => contract.unpause());
        // });

        it('can not unpause if a new contract is set', async () => {
            // TODO set geneScience before unpause
            await contract.setNewAddress('0xeFD0BD449180Addc538c7a3d6EEdf2B1b4FB7Bdb');

            await expectThrowsAsync(() => contract.unpause());
        });
    });

    // TODO test getKitty
});