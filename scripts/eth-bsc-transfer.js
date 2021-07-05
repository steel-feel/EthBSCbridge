const BridgeEth = artifacts.require('./BridgeEth.sol'),
      TokenEth = artifacts.require("./TokenEth.sol"),
      helper= require("./scripts/helper")

      const owner = helper.getWallet(),
            privKey = owner.privateKey;

module.exports = async done => {
  const nonce = 1; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const tokenEth = await TokenEth.deployed();
  const Fees = 1;
  const amount = 100 + Fees;
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
