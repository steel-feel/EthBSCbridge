const TokenEth = artifacts.require('./TokenEth.sol');

module.exports = async done => {
   const [sender, _] = await web3.eth.getAccounts();
   console.log("address: " + sender);
   console.log(`Eth balance:  ${await web3.eth.getBalance(sender)}`) ;
  const tokenEth = await TokenEth.deployed();
  const balance = await tokenEth.balanceOf(sender);
  console.log(balance.toString());

 
  
  
  done();


}
