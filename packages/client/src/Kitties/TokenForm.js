import React from 'react';
import Error from '../App/components/Error';

const TokenForm = ({ error, loading, onSubmit }) => {
    const defaultValue = '0x0000000000000000000000000000000000000000000000000000000000000001';
    return (
        <div className="mx-auto">
            <h3>Issue Token</h3>
        
            {error && (
                <Error error={error} />
            )}

            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="hex" className="form-control mb-1" placeholder={defaultValue} defaultValue={defaultValue} data-default-value={defaultValue} />

                    <button type="submit" disabled={loading} className="btn btn-block btn-primary">Issue</button>
                </form>
            </div>
        </div>
    )
}

export default TokenForm;
