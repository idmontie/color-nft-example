module.exports = {
    async mint(numberOfKitties, contract) {
        for (let i = 0; i < numberOfKitties; i++) {
            const numZeros = 64;
            const hexValue = (i).toString(16);
            const value = hexValue.padStart(numZeros, '0');

            await contract.createPromoKitty(
                `0x${value}`,
                '0x0000000000000000000000000000000000000000', // Assign to COO
            );
        }
    }
}