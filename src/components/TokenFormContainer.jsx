import React, { useCallback } from 'react';
import TokenForm from './TokenForm';

const TokenFormContainer = ({ contract, account, onTokensChange }) => {
    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        const color = event.target.color.value;

        if (!color || color.trim() === '') {
            return;
        }

        try {
            contract.methods.mint(color).send({ from: account });
            onTokensChange(color);
        } catch (e) {
            // TODO track error and loading state
            console.error(e);
        }

        // Reset the form
        event.target.color.value = '';
    }, [contract, account]);

    return <TokenForm onSubmit={handleSubmit} />
}

export default TokenFormContainer;