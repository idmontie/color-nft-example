import Web3 from 'web3';

export async function loadWeb3() {
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

export async function getMainAccount() {
  const { web3 } = window;

  // Load account
  const accounts = await web3.eth.getAccounts();

  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts found');
  }

  return accounts[0];
}

export async function getContract(Contract) {
  const { web3 } = window;

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Contract.networks[networkId];
  const address = deployedNetwork && deployedNetwork.address;
  const abi = Contract.abi;

  if (!address) {
    throw new Error('Contract not deployed to detected network');
  }

  const contract = new web3.eth.Contract(abi, address);

  return contract;
}