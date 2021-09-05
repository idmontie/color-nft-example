import BN from 'bn.js';

export default function padGenes(genesString) {
    // Genes should be a string.
    // Convert the string to bn58
    const hex = new BN(genesString, 10).toString('hex');
    // ensure hex is length of 64
    const hexPadded = hex.padStart(64, '0');
    return hexPadded;
}