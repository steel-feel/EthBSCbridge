const TokenBsc = artifacts.require('./TokenBsc.sol');

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
    //Address and Native balance
    console.log("address: " + recipient);
    console.log(`BNB balance:  ${await web3.eth.getBalance(recipient)}`) ;
    
 const tokenBsc = await TokenBsc.deployed();
 const balance = await tokenBsc.balanceOf(recipient);
 
 console.log(`Token balance: ${balance.toString()}`);

  done();
}
