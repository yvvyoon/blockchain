const EC = require('elliptic').ec;
const Transaction = require('./transaction');
const Blockchain = require('./blockchain');

const ec = new EC('secp256k1');

const userKeyStr1 = 'f3e52665f9b9f5b07fba6de46349f80fdfc80508de8e291cdc44813ed55e3df6';
const userKeyStr2 = '88ea5e3b0d8660cb13ab517dbac34f7f12d50cd160db58220b4f8154b4493659';

const privKey1 = ec.keyFromPrivate(userKeyStr1);
const privKey2 = ec.keyFromPrivate(userKeyStr2);

const wallet1 = privKey1.getPublic('hex');
const wallet2 = privKey2.getPublic('hex');

const mychain = new Blockchain();

const tx1 = new Transaction(wallet1, wallet2, 100);
const signTx1 = tx1.signTransaction(privKey1);
mychain.addTransaction(tx1);

const tx2 = new Transaction(wallet1, wallet2, 10);
const signTx2 = tx2.signTransaction(privKey1);
mychain.addTransaction(tx2);
mychain.minePendingTransactions(wallet1);

const tx3 = new Transaction(wallet2, wallet1, 20);
const signTx3 = tx3.signTransaction(privKey2);
mychain.addTransaction(tx2);
mychain.minePendingTransactions(wallet1);

mychain.printBlockchain();

console.log('wallet1 : ', mychain.getBalance(wallet1));
console.log('wallet2 : ', mychain.getBalance(wallet2));

console.log(">> wallet1 txs");
console.log(JSON.stringify(mychain.getAllTransactionOfWallet(wallet1), null, 2));

console.log(">> wallet2 txs");
console.log(JSON.stringify(mychain.getAllTransactionOfWallet(wallet2), null, 2));