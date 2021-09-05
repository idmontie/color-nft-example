# NFT Examples

## Get started

This project is a mono-repo that uses [Lerna](https://lerna.js.org/) and [Node](https://nodejs.org/en/).

You can set up the repo with:

```terminal
lerna bootstrap --hoist
```

This should install all the NPM packages and link them for the `./packages/` folder where the client and nft contracts are.

To get started with the NFT contracts:

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
lerna run migrate --scope=@nft/nft
```

### Testing

Test all the contract functionality using mocha test runner with chai assertions:

```terminal
npm run test
```

### Running the web

```terminal
lerna run start --scope=@nft/client
```
