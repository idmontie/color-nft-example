const KittyCore = artifacts.require('./KittyCore.sol');
const { expect } = require('chai');
const { expectThrowsAsync, expectNotThrowsAsync } = require('./common/helpers');
const kittyHelper = require('./common/kittyHelper');
/**
 * Test KittyOwnership abstract contract by deploying the KittyCore contract
 */
contract('KittyOwnership', (accounts) => {
    let contract;

    before(async () => {
        contract = await KittyCore.deployed();
    });

    // TODO test supportsInterface

    // TODO test setMetadataAddress

    // TODO test balanceOf

    // TODO test transfer

    // TODO test approve

    // TODO test transferFrom

    describe('totalSupply', () => {
        it('should return the total supply of kitties', async () => {
            const totalSupply = await contract.totalSupply();
            expect(totalSupply).to.be.bignumber.equal('0');

            await kittyHelper.mint(12, contract);

            const totalSupply2 = await contract.totalSupply();
            expect(totalSupply2).to.be.bignumber.equal('12');
        });
    });


    // TODO test ownerOf

    // TODO test tokensOfOwner

    // TODO test tokenMetadata
});