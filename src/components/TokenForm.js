import React from 'react';

const TokenForm = ({ onSubmit }) => {
    return (
        <div className="mx-auto">
            <h1>Issue Token</h1>

            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" name="color" className="form-control mb-1" placeholder="#ffffff" />

                    <button type="submit" className="btn btn-block btn-primary">Issue</button>
                </form>
            </div>
        </div>
    )
}

export default TokenForm;
