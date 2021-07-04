const TokenEth = artifacts.require('TokenEth.sol');
const TokenBsc = artifacts.require('TokenBsc.sol');
const BridgeEth = artifacts.require('BridgeEth.sol');
const BridgeBsc = artifacts.require('BridgeBsc.sol');

module.exports = async function (deployer, network, addresses) {
  if(network === 'ropsten') {
    await deployer.deploy(TokenEth);
    const tokenEth = await TokenEth.deployed();
    await tokenEth.mint(addresses[0], 10000);
    //Token admin i.e. contract having 2000 token

    await deployer.deploy(BridgeEth, tokenEth.address);
    const bridgeEth = await BridgeEth.deployed();
    await tokenEth.mint(bridgeEth.address, 20000);    
    await tokenEth.updateAdmin(bridgeEth.address);
   
  }

  


  if(network === 'bscTestnet') {

    await deployer.deploy(TokenBsc);
    const tokenBsc = await TokenBsc.deployed();
    await deployer.deploy(BridgeBsc, tokenBsc.address);
    const bridgeBsc = await BridgeBsc.deployed();
    await tokenBsc.mint(bridgeBsc.address, 20000);  
    await tokenBsc.updateAdmin(bridgeBsc.address);

    
  }

  //local testing

  if(network === 'genache') {
    await deployer.deploy(TokenEth);
    const tokenEth = await TokenEth.deployed();
    await tokenEth.mint(addresses[0], 10000);
    //Token admin i.e. contract having 2000 token

    await deployer.deploy(BridgeEth, tokenEth.address);
    const bridgeEth = await BridgeEth.deployed();
    await tokenEth.mint(bridgeEth.address, 20000);    
    await tokenEth.updateAdmin(bridgeEth.address);
   
  }

  if(network === 'skale') {

    await deployer.deploy(TokenBsc);
    const tokenBsc = await TokenBsc.deployed();
    await deployer.deploy(BridgeBsc, tokenBsc.address);
    const bridgeBsc = await BridgeBsc.deployed();
    await tokenBsc.mint(bridgeBsc.address, 20000);  
    await tokenBsc.updateAdmin(bridgeBsc.address);
  
  }



};
