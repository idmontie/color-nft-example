# NFT Tutorial

## Local Development

### Setup

1. Install Truffe:

```terminal
npm install -g truffle
```

2. Install Ganache
3. Run Ganache
3. Install [MetaMask](https://metamask.io/download.html)
4. Add your Ganache IP and first account private key to MetaMask

### Migrations

Deploy the contracts to your local ganache instance:

```terminal
npm run nft:migrate
```

### Testing

Test all the contract functionality using mocha test runner with chai assertions:

```terminal
npm run nft:test
```

### Running the web

```terminal
npm start
```
