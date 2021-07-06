const TokenEth = artifacts.require('./TokenEth.sol');
const BridgeEth = artifacts.require('BridgeEth.sol'); 

module.exports = async done => {
   const [sender, _] = await web3.eth.getAccounts();
   console.log("address: " + sender);
   console.log(`Eth balance:  ${await web3.eth.getBalance(sender)}`) ;
  const tokenEth = await TokenEth.deployed();
  const balance = await tokenEth.balanceOf(sender);
  console.log(`Token balance: ${balance.toString()}`);

  const bridgeEth = await BridgeEth.deployed();  

  const contractTokenBal = await tokenEth.balanceOf(bridgeEth.address)

  console.log(`Balance of contract on Eth  ${contractTokenBal}`)

  done();


}
