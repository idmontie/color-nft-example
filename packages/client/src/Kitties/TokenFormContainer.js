import React, { useCallback, useState } from 'react';
import BN from 'bn.js';
import TokenForm from './TokenForm';

const TokenFormContainer = ({ contract, account, onTokensChange }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        const str = event.target.hex.value;

        let hex = '';

        if (str.startsWith('0x')) {
            hex = str;
        } else {
            hex = '0x' + (new BN(str).toString(16));
        }

        if (!hex || hex.trim() === '') {
            return;
        }

        console.log('hex', hex);

        setLoading(true);
        setError(null);

        try {
            await contract.methods.createPromoKitty(hex, account).send({ from: account });
            onTokensChange(hex);
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }

        // Reset the form
        const defaultValue = event.target.hex.dataset.defaultValue ?? '';
        event.target.hex.value = defaultValue;
    }, [contract, account, onTokensChange]);

    return <TokenForm loading={loading} error={error} onSubmit={handleSubmit} />
}

export default TokenFormContainer;