const TokenBsc = artifacts.require('./TokenBsc.sol');
const BridgeBsc = artifacts.require('BridgeBsc.sol');

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
    //Address and Native balance
    console.log("address: " + recipient);
    console.log(`BNB balance:  ${await web3.eth.getBalance(recipient)}`) ;
    
 const tokenBsc = await TokenBsc.deployed();
 const balance = await tokenBsc.balanceOf(recipient);
 console.log(`Token balance: ${balance.toString()}`);

 const obridgeBsc = await BridgeBsc.deployed();  

 const contractTokenBal = await tokenBsc.balanceOf(obridgeBsc.address)

 console.log(`Balance of contract on Eth  ${contractTokenBal}`)



  done();
}
