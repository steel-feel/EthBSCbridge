const Web3 = require('web3');
const BridgeEth = require('../build/contracts/BridgeEth.json');
const BridgeBsc = require('../build/contracts/BridgeBsc.json');

const web3Eth = new Web3('wss://ropsten.infura.io/ws/v3/49c09db3360d4665a9c0fdbd99b11bb8');
const web3Bsc = new Web3('wss://bsc.getblock.io/testnet/');

const helper = require("./helper"); 

const owner = helper.getWallet(),//"./../AccountKeyStore.json"
        privKey = owner.privateKey;

// let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');
/*
let owner;
let privKey;
      if (fs.existsSync(`./../AccountKeyStore.json`)) {
        let passphrase = prompt("Please enter passphrase of account ");
        const keyStore = fs.readFileSync("./../AccountKeyStore.json");
             owner = web3Eth.eth.accounts.decrypt(JSON.parse(keyStore), passphrase);
             privKey = owner.privateKey;

        if(!owner)
            throw new Error("Wrong passpharse. try again");
  
    }
    else
     throw new Error("Could'nt find keystore, Please create one. refer Readme for instructions");
*/


const { address: admin } = web3Bsc.eth.accounts.wallet.add(privKey);

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

//BSC bridge
bridgeBsc.events.Transfer(
  {fromBlock: "latest", step: 0}
)
.on('data', async event => {
 // console.log("I am here");
  const { from, to, amount, date, nonce, signature } = event.returnValues;

  const tx = bridgeEth.methods.mint(from, to, amount, nonce, signature);
  const [gasPrice, gasCost] = await Promise.all([
    web3Eth.eth.getGasPrice(),
    tx.estimateGas({from: admin}),
  ]);
  const data = tx.encodeABI();
  const txData = {
    from: admin,
    to: bridgeEth.options.address,
    data,
    gas: gasCost,
    gasPrice
  };
  const receipt = await web3Eth.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
    - nonce ${nonce}
  `);

})



//Eth bridge
bridgeEth.events.Transfer(
  {fromBlock: "latest", step: 0}
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

console.log("Bridge started....");
