const BridgeBsc = artifacts.require('./BridgeBsc.sol'),
      TokenBsc = artifacts.require("./TokenBsc.sol");

const helper = require("./helper"); 
let privKey;

const owner = helper.getWallet("./../AccountKeyStore.json");

privKey = owner.privateKey;

module.exports = async done => {
  //TODO: get Nonce from local db (eg: lowDB)
  const nonce = 6; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const oBridgeBsc = await BridgeBsc.deployed();
  const oTokenBsc = await TokenBsc.deployed();
  const amount = 100;
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
  done();
}
