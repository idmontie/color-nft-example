import React from 'react';

const TokenForm = ({ error, loading, onSubmit }) => {
    return (
        <div className="mx-auto">
            <h3>Issue Token</h3>
        
            {error && (
                <div>
                    {error}
                </div>
            )}

            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="color" className="form-control mb-1" placeholder="#ffffff" />

                    <button type="submit" disabled={loading} className="btn btn-block btn-primary">Issue</button>
                </form>
            </div>
        </div>
    )
}

export default TokenForm;
