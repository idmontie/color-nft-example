import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Color from '../abis/Color.json';
import './App.css';
import TokenListContainer from './TokenListContainer';
import TokenFormContainer from './TokenFormContainer';

async function loadWeb3() {
  const { ethereum, web3 } = window;
  if (ethereum) {
    window.web3 = new Web3(ethereum);
    await ethereum.enable();
  } else if (web3) {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

async function getMainAccount() {
  const { web3 } = window;

  // Load account
  const accounts = await web3.eth.getAccounts();

  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts found');
  }

  return accounts[0];
}

async function getContract() {
  const { web3 } = window;

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Color.networks[networkId];
  const address = deployedNetwork && deployedNetwork.address;
  const abi = Color.abi;

  if (!address) {
    throw new Error('Contract not deployed to detected network');
  }

  const contact = new web3.eth.Contract(abi, address);

  return contact;
}

const App = () => {
  const [refresh, setRefresh] = useState(+new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);

  const init = async () => {
    try {
      await loadWeb3();
      const a = await getMainAccount();
      const c = await getContract();
      
      setAccount(a);
      setContract(c);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }

  const onTokensChange = () => {
    setRefresh(+new Date());
  };
 
  useEffect(() => {
    init();

    const i = setInterval(() => {
      setRefresh(+new Date());
    }, 1000);

    return () => {
      clearInterval(i);
    }
  }, []);

  if (loading) {
    // TODO style
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  if (error) {
    // TODO style
    return <div>{error.message}</div>;
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
}


export default App;
