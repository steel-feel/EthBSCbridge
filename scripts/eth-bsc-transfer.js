const BridgeEth = artifacts.require('./BridgeEth.sol'),
      TokenEth = artifacts.require("./TokenEth.sol");

//TODO: hide private key in variable
const privKey = '0x439af4bf04ef09ebabaf8465e4bbef4cb09abb3b3135400dd465300d5aa2548c';

module.exports = async done => {
  const nonce = 1; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const tokenEth = await TokenEth.deployed();
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
  await tokenEth.approve(bridgeEth.address, amount);

  await bridgeEth.burn(accounts[0], amount, nonce, signature);
  done();
}
