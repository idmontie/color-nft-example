import React, { useState, useEffect } from 'react';
import TokenListContainer from './TokenListContainer';
import TokenFormContainer from './TokenFormContainer';
import Error from '../Error';

import Color from '../../abis/Color.json';
import { getContract } from '../Contracts/web3';

const ColorDashboard = ({ account }) => {
  const [refresh, setRefresh] = useState(+new Date());
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const init = async () => {
    try {
      const c = await getContract(Color);

      setContract(c);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const onTokensChange = () => {
    setRefresh(+new Date());
  };
 
  useEffect(() => {
    const i = setInterval(() => {
      setRefresh(+new Date());
    }, 1000);

    return () => {
      clearInterval(i);
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>

        Loading contract...
      </div>
    );
  }

  if (error) {
    return (
      <Error error={error} />
    );
  }

  return (
    <div>
     <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex">
            <TokenFormContainer contract={contract} account={account} onTokensChange={onTokensChange} />
          </main>
        </div>
      </div>
      
      <TokenListContainer contract={contract} refresh={refresh} />
    </div>
  );
};

export default ColorDashboard;