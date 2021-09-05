import React, { useEffect, useState } from 'react';
import Error from '../App/components/Error';
import TokenList from './TokenList';

const TokenListContainer = ({ contract, refresh }) => {
    const [error, setError] = useState(null);
    const [totalSupply, setTotalSupply] = React.useState(0);
    const [tokens, setTokens] = React.useState([]);

    const init = async () => {
        try {
            const ts = await contract.methods.totalSupply().call();
            setError(null);
            setTotalSupply(ts.toString());

            let acc = [];

            const max = Math.min(ts, 100);

            // I think kitties are 1-indexed
            for (let i = 0; i <= max; i++) {
                const token = await contract.methods.getKitty(i).call();
                acc.push(token);
            }

            setTokens(acc.reverse());
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        if (contract) {
            init();
        }
    }, [contract, refresh]);

    if (error) {
        return (
            <Error error={error} />
        );
    }

    return <TokenList totalSupply={totalSupply} tokens={tokens} />;
}

export default TokenListContainer;