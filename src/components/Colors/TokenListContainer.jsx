import React, { useEffect } from 'react';
import TokenList from './TokenList';

const TokenListContainer = ({ contract, refresh }) => {
    const [totalSupply, setTotalSupply] = React.useState(0);
    const [tokens, setTokens] = React.useState([]);

    const init = async () => {
        const ts = await contract.methods.totalSupply().call();
        setTotalSupply(ts.toString());

        let acc = [];

        const max = Math.min(ts, 100);

        for (let i = 0; i < max; i++) {
            const token = await contract.methods.colors(i).call();
            acc.push(token);
        }

        setTokens(acc);
    };

    useEffect(() => {
        if (contract) {
            init();
        }
    }, [contract, refresh]);

    return <TokenList totalSupply={totalSupply} tokens={tokens} />;
}

export default TokenListContainer;