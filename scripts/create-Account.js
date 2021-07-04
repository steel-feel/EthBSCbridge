const prompt = require('prompt-sync')(),
    fs = require('fs'),
    Web3 = require("web3");

if (fs.existsSync(`./AccountKeyStore.json`)) {
    let ans = prompt('Keystore already exists. do you want to create new?(Y/n) \n');
    if (ans === "Y" || ans === 'y') createWallet();
}
else {
    createWallet()
}

async function createWallet() {

    let passphrase = prompt("Please enter Passphrase for new account: ");
    if (!passphrase){
        console.error("Please enter valid passpharse and try again...");
        return;
    }

    let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/'),
        account = web3.eth.accounts.create(),
        keyStoreJson = web3.eth.accounts.encrypt(account.privateKey, passphrase);

    await fs.promises.writeFile("AccountKeyStore.json", JSON.stringify(keyStoreJson)).catch((err) => {
        throw new Error(err)
    });

    console.log("Keystore has been saved to file system.")

    return Promise.resolve(true);
}
