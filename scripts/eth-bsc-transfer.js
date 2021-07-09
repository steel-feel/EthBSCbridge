const BridgeEth = artifacts.require('./BridgeEth.sol'),
      TokenEth = artifacts.require("./TokenEth.sol");
const {db} = require("./dbhelper.js"),
      helper = require("./helper"); 
      let privKey;

const owner = helper.getWallet("./../AccountKeyStore.json");

privKey = owner.privateKey;

module.exports = async done => {

  let nonce = db.get("nonce").value(); //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const tokenEth = await TokenEth.deployed();
  const amount = 200;
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 

    //get Approval for amount+fees
  let fees = await bridgeEth.getFees();
  
  await tokenEth.approve(bridgeEth.address, amount+fees);
  
  await bridgeEth.burn(accounts[0], amount, nonce, signature);
 
  db.set("nonce", nonce+1).save();

  console.log("Transfer completed");
  
  done();
}
