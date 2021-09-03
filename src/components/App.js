import React, { useEffect, useState } from 'react';
import './App.css';

import ColorDashboard from './Colors/ColorDashboard';
import Error from './Error';
import { loadWeb3, getMainAccount } from './Contracts/web3';

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
          <span className="sr-only">Loading...</span>
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
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens
          </a>

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">
                <span>Your Address:</span>
                <span>{account}</span>
              </small>
            </li>
          </ul>
        </nav>
        
        <ColorDashboard account={account} />
      </div>
    );
}


export default App;
