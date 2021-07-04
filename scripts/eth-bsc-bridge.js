const Web3 = require('web3');
const BridgeEth = require('../build/contracts/BridgeEth.json');
const BridgeBsc = require('../build/contracts/BridgeBsc.json');

const web3Eth = new Web3('wss://ropsten.infura.io/ws/v3/49c09db3360d4665a9c0fdbd99b11bb8');
const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
// const web3Eth = new Web3('http://localhost:7545');
// const web3Bsc = new Web3('https://localhost:1234');
const adminPrivKey = '0x439af4bf04ef09ebabaf8465e4bbef4cb09abb3b3135400dd465300d5aa2548c';

const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

const bridgeEth = new web3Eth.eth.Contract(
  BridgeEth.abi,
  BridgeEth.networks['3'].address
);

// const bridgeEth = new web3Eth.eth.Contract(
//   BridgeEth.abi,
//   BridgeEth.networks['5777'].address
// );

const bridgeBsc = new web3Bsc.eth.Contract(
  BridgeBsc.abi,
  BridgeBsc.networks['97'].address
);

// const bridgeBsc = new web3Bsc.eth.Contract(
//   BridgeBsc.abi,
//   BridgeBsc.networks['54173'].address
// );


bridgeEth.events.Transfer(
  {fromBlock: 0, step: 0}
)
.on('data', async event => {
  //console.log("I am here");
  const { from, to, amount, date, nonce, signature } = event.returnValues;

  const tx = bridgeBsc.methods.mint(from, to, amount, nonce, signature);
  const [gasPrice, gasCost] = await Promise.all([
    web3Bsc.eth.getGasPrice(),
    tx.estimateGas({from: admin}),
  ]);
  const data = tx.encodeABI();
  const txData = {
    from: admin,
    to: bridgeBsc.options.address,
    data,
    gas: gasCost,
    gasPrice
  };
  const receipt = await web3Bsc.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
    - nonce ${nonce}
  `);
});

// setInterval(()=> {console.log("logger started")}, 100000);
