import React, { useEffect, useState } from 'react';
import './App.css';

import ColorDashboard from '../../Colors/ColorDashboard';
import KittiesDashboard from '../../Kitties/KittiesDashboard';
import Error from './Error';
import { loadWeb3, getMainAccount } from '../../Contracts/web3';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');

  const init = async () => {
    try {
      await loadWeb3();
      const a = await getMainAccount();
      
      setAccount(a);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        Loading Web3 and acounts..
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
        <nav className="navbar navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
          <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            >
              NFT Dashboard
            </a>

            <div className="d-flex">
              <div className="nav-item text-nowrap">
                <small className="text-white">
                  <span>Your Address:</span>
                  <span>{account}</span>
                </small>
              </div>
            </div>
            </div>
        </nav>
        
        <div className="mt-5">
          <div className="container">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2>Kitties</h2>

                  <KittiesDashboard account={account} />
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-5">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2>Colors</h2>
                  
                  <ColorDashboard account={account} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}


export default App;
