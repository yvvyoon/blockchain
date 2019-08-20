const express = require('express');
const router = express.Router();
const EC = require('elliptic').ec;
const Transaction = require('./myChain/transaction');
const Blockchain = require('./myChain/blockchain');

const ec = new EC('secp256k1');

// key generator를 이용하여 프라이빗키 생성
const userKeyStr1 = 'ae8565c0d8ec48f215127b969a94867496f5984db8b934fa4b520ff4d95b54b8';
const userKeyStr2 = '6aea1cd30950714f54a880fac4a7ca53e07d37856bc02704d44f21de98d6ccd1';

// 설정한 사용자키를 이용하여 프라이빗키 생성
const privKey1 = ec.keyFromPrivate(userKeyStr1);
const privKey2 = ec.keyFromPrivate(userKeyStr2);

// 생성한 프라이빗키를 이용하여 지갑주소 생성
const wallet1 = privKey1.getPublic('hex');
const wallet2 = privKey2.getPublic('hex');

// 블록체인 객체 생성
const myChain = new Blockchain();

// 임의의 트랜잭션 tx1, tx2, tx3 객체 생성
const tx1 = new Transaction(wallet1, wallet2, 100);
const signTx1 = tx1.signTransaction(privKey1);
myChain.addTransaction(tx1);

const tx2 = new Transaction(wallet1, wallet2, 10);
const signTx2 = tx2.signTransaction(privKey1);
myChain.addTransaction(tx2);

myChain.minePendingTransactions(wallet1);

const tx3 = new Transaction(wallet2, wallet1, 20);
const signTx3 = tx3.signTransaction(privKey2);
myChain.addTransaction(tx2);

myChain.minePendingTransactions(wallet1);

myChain.printBlockchain();

console.log('Wallet1 : ', myChain.getBalance(wallet1));
console.log('Wallet2 : ', myChain.getBalance(wallet2));

console.log(">> Wallet1 txs");
console.log(JSON.stringify(myChain.getAllTransactionOfWallet(wallet1), null, 2));

console.log(">> Wallet2 txs");
console.log(JSON.stringify(myChain.getAllTransactionOfWallet(wallet2), null, 2));

/* GET home page. */
/* URL : /blockchain */
router.get('/', function (req, res, next) {
    res.render('blockchain', {
        title: 'myScan.io',
        blocks: myChain.chain,
        selectedIdx: 0,
    });
});

// 블록을 클릭했을 때의 라우팅 /block/0, /block/1, /block/2 ...
router.get('/block/:idx', function (req, res, next) {
    const selectedIdx = req.params.idx;

    res.render('blockchain', {
        title: 'Blockchain info',
        blocks: myChain.chain,
        txs: myChain.chain[selectedIdx].transactions,
        selectedIdx: selectedIdx,
    });
});

router.get('/createtx', function (req, res, next) {
    res.render('createtx', {
        wallet: wallet1,
    });
});

router.post('/createtx', function (req, res, next) {
    const fromAddress = req.body.fromAddress;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;

    console.log('fromAddress: ' + fromAddress);
    console.log('toAddress: ' + toAddress);
    console.log('amount: ' + amount);

    const tx = new Transaction(fromAddress, toAddress, amount);
    tx.signTransaction(privKey1);

    myChain.addTransaction(tx);

    console.log(myChain.pendingTransactions);

    res.redirect('/blockchain/pendingtransaction');
});

router.get('/pendingtransaction', function (req, res, next) {
    let txs = myChain.pendingTransactions;

    res.render('pendingtransaction', {
        txs: txs,
    });
});

router.get('/miningblock', function (req, res, next) {
    console.log('Block is mining...');

    // 보상받을 주소로 채굴된 코인 전송
    myChain.minePendingTransactions(wallet1);

    console.log('Block is mined!');

    res.redirect('/blockchain');
});

module.exports = router;