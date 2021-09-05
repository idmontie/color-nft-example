import React from 'react';
import GeneViewer from './GeneViewer';
import CryptoKitty from './KittyViewer/CryptoKitty';
import getGeneMapping from './utilities/getGeneMapping';

const TokenList = ({ tokens, totalSupply }) => {
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h3>Token List ({totalSupply})</h3>
                </div>
            </div>

            <div className="row">
                {tokens.map((token, i) => {
                    const genes = getGeneMapping(token.genes)
                    return (
                        <div key={JSON.stringify(token) + i} className="col-md-3 mb-3 text-center">
                            {/* <div>{JSON.stringify(token)}</div> */}
                            <div>{token.genes}</div>
                            <CryptoKitty {...genes} />
                            <GeneViewer genes={token.genes} />
                        </div>
                        
                    );
                })}
            </div>
        </div>
    );
};

export default TokenList;