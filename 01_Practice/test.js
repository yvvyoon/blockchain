const Block = require('./block');
const Transaction = require('./transaction');
const Blockchain = require('./blockchain');

let myChain = new Blockchain();
// myChain.printAllBlockchain();
// console.log('----------------------');

const newTransaction = new Transaction('yyw', 'csj', 5);

const newBlock = new Block(1, Date.now(), newTransaction);
const newBlock2 = new Block(2, Date.now(), 'data2', newBlock.curHash);

myChain.addBlock(newBlock);
myChain.addBlock(newBlock2);

myChain.printAllBlockchain();
console.log('chain validation: ' + myChain.isChainValid());

// nonce값을 포함하여 해싱하므로 nonce값을 조작하면 에러 발생
myChain.chain[1].nonce = 100;
console.log('chain validation: ' + myChain.isChainValid());