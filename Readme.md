## Eth - BSC bridge

Project developed to demostrate a bridge for transfering ERC20 token accross two chains.

*Pre-requesite*
Truffle
npm
node


Eth Testnet: Ropsten

> Can do testing between any two chains as well

### Basic commands

**Create account & Keystore file**

`
node ./scripts/create-Account.js
`

**Command to deploy/migrate contracts**

`
truffle migrate --network ropsten
`

`
truffle migrate --network bscTestnet
`


**Check ETH Testnet balance Balances**

`
truffle exec ./scripts/eth-token-balance.js --network ropsten
`

**Check BSC Testnet balance Balances**


`
truffle exec ./scripts/bsc-token-balance.js --network bscTestnet
`

**Boot up bridges**

Run below commands in different console windows

BSC test net bridge
`
npm run bbridge
`

Ethereum Ropsten bridge
`
npm run ebridge
`

**Transfer amount from Ropsten to BSC (fixed to 100)**

`
npm run fromEthToBsc
`

### Steps for testing

1. Create account
2. Deploy/migrate contracts
3. Boot up the bridge
4. Execute transfer

# Nice feature to be included
1. _Offline Signing_: Signing of transcation can be done at isolated system (eg A rasberry pi in subnet) and data transmission between then can be done using ZeroMQ Protocol.

2. Web UI : Would be great to have a nice UI interaction with bridge.
