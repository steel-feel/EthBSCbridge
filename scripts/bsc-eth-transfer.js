const BridgeBsc = artifacts.require('./BridgeBsc.sol'),
      TokenBsc = artifacts.require("./TokenBsc.sol");
const {db} = require("./dbhelper.js"),
      helper = require("./helper"); 
let privKey;

const owner = helper.getWallet("./../AccountKeyStore.json");

privKey = owner.privateKey;

module.exports = async done => {
  const nonce = db.get("nonce").value(); 
  const accounts = await web3.eth.getAccounts();
  const oBridgeBsc = await BridgeBsc.deployed();
  const oTokenBsc = await TokenBsc.deployed();
  const amount = 80;
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
  let fees = await oBridgeBsc.getFees();

  await oTokenBsc.approve(oBridgeBsc.address, amount+fees);

  await oBridgeBsc.burn(accounts[0], amount, nonce, signature);
  
  db.set("nonce", nonce + 1).save();

  done();
}
