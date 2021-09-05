import React from 'react';

const TokenList = ({ tokens, totalSupply }) => {
    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h3>Token List ({totalSupply})</h3>
                </div>
            </div>

            <div className="row">
                {tokens.map(token => (
                    <div key={token} className="col-md-3 mb-3 text-center">
                        <div className="token" style={{
                            backgroundColor: token,
                        }} />
                        <div>{token}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TokenList;