import BN from 'bn.js';

export default function getBase32Genes(geneString) {
    const base32 = new BN(geneString, 10).toString(32);

    let padded = base32.padStart(12 * 4, '0');

    return padded;
}