const Web3 = require("web3"),
      prompt = require('prompt-sync')(),
      fs = require('fs'); 

let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');

function getWallet(){
    if (fs.existsSync(`./AccountKeyStore.json`)) {

    let passphrase = prompt("Please enter passphrase of account ");
    const keyStore = fs.readFileSync("./AccountKeyStore.json"),
    owner = web3.eth.accounts.decrypt(JSON.parse(keyStore), passphrase);

    if(!owner)
        throw new Error("Wrong passpharse. try again");

    return owner;    
}
  throw new Error("Could'nt find keystore, Please create one. refer Readme for instructions");

}

exports.getWallet = getWallet;