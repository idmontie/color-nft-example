const { expect } = require('chai');
const { expectThrowsAsync, expectNotThrowsAsync } = require('./common/helpers');
const GeneScience = artifacts.require('./GeneScience.sol');
const BN = require('bn.js');

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

    describe('mixGenes', () => {
        // Use something like https://etherscan.io/token/0x06012c8cf97bead5deae237070f9587f8e7a266d?a=2008433#readContract
        // to get genes from the contract
        const mom = '290378905075260212242950821794973325441448525717160056524417317401005881'; // id 2007929
        const dad = '642363244924395177321058280003368633475571167269502597585764896258425625'; // id 2004018

        // Children are psuedo-randomly generated
        // const child = '311084158920347302532783222503507017920314267858328442789965665127399545'; // id 2008433
        // const child = '457741529684954147076415104383300776997285703872208704683254836281796387';

        const gene1 = new BN(mom, 10);
        const gene2 = new BN(dad, 10);

        it('fails if targetBlock is less than or equal to the current block', async () => {
            const targetBlock = await web3.eth.getBlockNumber();

            await expectThrowsAsync(() => contract.mixGenes(gene1, gene2, targetBlock, { from: accounts[0] }));
        });

        it('fails if targetBlock is less than or equal to the current block', async () => {
            const targetBlock = await web3.eth.getBlockNumber() - 100;
            
            let v;

            await expectNotThrowsAsync(async () => {
                v = await contract.mixGenes(gene1, gene2, targetBlock, { from: accounts[0] })
            });

            expect(v.toString()).to.not.be.null;
        });
    });
});
