const { expect } = require('chai');

const Color = artifacts.require('./Color.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Color', (accounts) => {
    let contract;

    before(async () => {
        contract = await Color.deployed();
    });

    describe('deployment', async () => {
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
            expect(name).to.be.equal('Color');
        });

        it('has a symbol', async () => {
            const symbol = await contract.symbol();

            // Contract symbol is not empty
            expect(symbol).to.not.be.empty;
            expect(symbol).to.be.equal('COLORS');
        });
    });

    describe('minting', async () => {
        it('creates a new token', async () => {
            // Before check
            let totalSupply = await contract.totalSupply();
            expect(totalSupply.toString()).to.be.equal('0');

            const result = await contract.mint('#EC058E');
            const event = result.logs[0].args;

            // After check
            totalSupply = await contract.totalSupply();

            expect(totalSupply.toString()).to.be.equal('1');
            // From null address
            expect(event.from).to.be.equal('0x0000000000000000000000000000000000000000');
            // To contract address
            expect(event.to).to.be.equal(accounts[0]);
        });

        it('makes sure token is unique', async () => {
            await contract.mint('#AAA');
            const totalSupply = await contract.totalSupply();

            await contract.mint('#AAA').should.be.rejected;

            const totalSupply2 = await contract.totalSupply();

            expect(totalSupply2.toString()).to.be.equal(totalSupply.toString());
        });
    });

    describe('indexing', () => {
        it('lists colors', async () => {
            // Mint some colors
            await contract.mint('#EC058F');
            await contract.mint('#FF0000');
            await contract.mint('#0000FF');

            const totalSupply = await contract.totalSupply();

            const colorSet = [];

            for (let i = 0; i < totalSupply; i++) {
                const colors = await contract.colors(i);
                colorSet.push(colors);
            }

            expect(colorSet).to.contain('#EC058F');
            expect(colorSet).to.contain('#FF0000');
            expect(colorSet).to.contain('#0000FF');
        });
    });
});
