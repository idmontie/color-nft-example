import React, { useCallback, useState } from 'react';
import TokenForm from './TokenForm';

const TokenFormContainer = ({ contract, account, onTokensChange }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        const color = event.target.color.value;

        if (!color || color.trim() === '') {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            contract.methods.mint(color).send({ from: account });
            onTokensChange(color);
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }

        // Reset the form
        event.target.color.value = '';
    }, [contract, account]);

    return <TokenForm loading={loading} error={error} onSubmit={handleSubmit} />
}

export default TokenFormContainer;