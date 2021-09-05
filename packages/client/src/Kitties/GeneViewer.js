import React from 'react';
import BN from 'bn.js';
import bs58 from 'bs58';
import padGenes from './utilities/getPadGenes';

function chunkBy5Bits(genes) {
    const base32 = new BN(genes, 10).toString(32);

    let padded = base32.padStart(12 * 4, '0')
    
    // Split address into 4 char chunks (backwards)
    const chunks = [];
    for (let i = padded.length - 4; i >= 0; i -= 4) {
        chunks.push(padded.slice(i, i + 4));
    }
    return chunks.reverse();
}

function chunkByBase16(genes) {
    const hexPadded = padGenes(genes);   

    console.log(hexPadded);

    // Split address into 4 char chunks
    const chunks = [];
    for (let i = 0; i < hexPadded.length; i += 4) {
        chunks.push(hexPadded.slice(i, i + 4));
    }

    return chunks
}

function chunkByBase58(genes) {
    const hexPadded = padGenes(genes);

    // Convert to buffer
    const buffer = Buffer.from(hexPadded, 'hex');
    // Convert to base58
    const base58 = bs58.encode(buffer);

    // Split address into 4 char chunks (backwards)
    const chunks = [];
    for (let i = base58.length - 4; i >= 0; i -= 4) {
        chunks.push(base58.slice(i, i + 4));
    }
    return chunks.reverse();
}

const GeneViewer = ({ genes }) => {
    const chunks = chunkBy5Bits(genes);

    // Display the chunks
    return (
        <div className="gene-viewer">
            {chunks.map((chunk, index) => (
                <div key={index} className="gene-viewer__chunk">
                    {chunk}
                </div>
            ))}
        </div>
    );
};

export default GeneViewer;