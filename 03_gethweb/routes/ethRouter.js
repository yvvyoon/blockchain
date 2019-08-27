const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const sendTransaction = require('../keyExtract');

// 구동 중인 geth 서버로 Web3 객체 생성
const web3 = new Web3('http://localhost:8545');

/* URL : /eth */
router.get('/', async function (req, res, next) {
    const blockNumber = await web3.eth.getBlockNumber();
    const showCount = 10;
    let blockList = [];
    let startBlockNum = 0;
    const endBlockNum = blockNumber;
    let txs = [];

    if (blockNumber > showCount) {
        startBlockNum = blockNumber - showCount;
    }

    for (let i = startBlockNum; i < endBlockNum; i++) {
        let block = await web3.eth.getBlock(i);

        blockList.push(block);

        if (block !== null && block.transactions !== null) {
            block.transactions.forEach(async (el) => {
                txs = await web3.eth.getTransaction(el);

                console.log('tx hash: ', txs.hash);
                console.log('   nonce: ', txs.nonce);
                console.log('   blockNumber: ', txs.blockNumber);
                console.log('   from: ', txs.from);
                console.log('   to: ', txs.to);
                console.log('');
            });
        }
    }

    res.render('blockchain', {
        blocks: blockList,
        title: 'MyScan.io',
        selectedIdx: startBlockNum,
        txs: txs,
    });
});

// 블록을 클릭했을 때의 라우팅 /block/0, /block/1, /block/2 ...
router.get('/block/:idx', function (req, res, next) {
    const selectedIdx = req.params.idx;
    const blockNumber = web3.eth.getBlockNumber();
    let startBlockNum = 0;
    const endBlockNum = blockNumber;
    let blockList = [];
    let transactionList = [];

    for (let i = startBlockNum; i < endBlockNum; i++) {
        web3.eth.getBlock(i)
            .then(block => {
                blockList.push(block);

                block.transactions.forEach(el => {
                    web3.eth.getTransaction(el)
                        .then(tx => {
                            if (selectedWalletAddr === tx.from || selectedWalletAddr === tx.to) {
                                transactionList.push({
                                    fromAddress: tx.from,
                                    toAddress: tx.to,
                                    amount: tx.value,
                                });
                            }
                            console.log(tx);
                        })
                        .catch(err => {
                            console.error(err);
                        });
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    res.render('blockchain', {
        title: 'MyScan.io',
        blocks: blockList,
        txs: transactionList,
        selectedIdx: selectedIdx,
    });
});


router.get('/test', function (req, res, next) {
    web3.eth.getBlockNumber()
        .then(number => {
            console.log(number);

            res.json(number);
        })
        .catch(err => {
            console.error(err);
        });
});

router.get('/accountlist', function (req, res, next) {
    web3.eth.getAccounts()
        .then(async (accounts) => {
            let accountList = [];
            let balance;

            for (let i = 0; i < accounts.length; i++) {
                balance = await web3.eth.getBalance(accounts[i]);

                accountList.push({
                    walletAddress: accounts[i],
                    balance: web3.utils.fromWei(balance, 'ether'),
                });
            }

            res.render('accountlist', {
                accounts: accountList,
                balance: balance,
            });
        })
        .catch(err => {
            console.error(err);
        });
});

router.get('/createtx', function (req, res, next) {
    web3.eth.getAccounts()
        .then(async (accounts) => {
            const myWallet = await accounts[0];
            // console.log('myWallet: ', myWallet);

            res.render('createtx', {
                title: 'MyScan.io',
                wallet: myWallet,
            });
        })
        .catch(err => {
            console.error(err);
        });
});

// 전송 트랜잭션 생성
router.post('/createtx', function (req, res, next) {
    const fromAddress = req.body.fromAddress;
    const toAddress = req.body.toAddress;
    const amount = req.body.amount;

    console.log('fromAddress: ' + fromAddress);
    console.log('toAddress: ' + toAddress);
    console.log('amount: ' + amount);

    // keyExtract.sendTransaction(fromAddress, toAddress, amount);
    sendTransaction(fromAddress, toAddress, amount);
    // myChain.addTransaction(tx);
    // console.log(myChain.pendingTransactions);

    res.redirect('/eth/pendingtransaction');
});

router.get('/pendingtransaction', function (req, res, next) {
    let txs = web3.eth.subscribe('pendingTransaction');

    res.render('pendingtransaction', {
        title: 'MyScan.io',
        txs: txs,
    });
});

// URL에 지갑주소를 입력했을 때의 지갑 화면 렌더링
router.get('/wallet/:addr', function (req, res, next) {
    const selectedWalletAddr = req.params.addr;
    let transactionList = [];
    let balance = '';

    console.log('1111');

    web3.eth.getBlockNumber()
        .then(async blockNumber => {
            for (let i = 0; i < blockNumber; i++) {
                await web3.eth.getBlock(i)
                    .then(block => {
                        block.transactions.forEach(el => {
                            web3.eth.getTransaction(el)
                                .then(tx => {
                                    // if (selectedWalletAddr === tx.from || selectedWalletAddr === tx.to) {
                                        transactionList.push({
                                            fromAddress: tx.from,
                                            toAddress: tx.to,
                                            amount: tx.value,
                                        });
                                    // }
                                    console.log(tx);
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }

            balance = web3.eth.getBalance(selectedWalletAddr);

            res.render('wallet', {
                title: 'MyScan.io',
                txs: transactionList,
                address: selectedWalletAddr,
                balance: parseInt(balance),
            });
        })
        .catch(err => {
            console.error(err);
        });
});

router.get('/miningblock', function (req, res, next) {
    console.log('Block is mining...');

    // 보상받을 주소로 채굴된 코인 전송
    myChain.minePendingTransactions(wallet1);

    console.log('Block is mined!');

    res.redirect('/blockchain');
});

// router.get('/pendingtxs', function (req, res, next) {
//     web3.eth.subscribe('pendingTransactions', (err, result) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log('Transactions matching 1');
//             console.log(result);
//         }
//     })
//         .on('data', (trxData) => {
//             console.log('Transactions matching 2');
//             console.log(trxData);
//         });
//
//     res.end();
//
//     // res.render('pendingtransaction', {
//     //     title: 'MyScan.io',
//     //     txs: txs,
//     // });
// });

// 채굴 난이도, 보상 설정 화면 렌더링
router.get('/settings', function (req, res, next) {
    res.render('settings', {
        title: 'MyScan.io',
    });
});

// 채굴 난이도, 보상 설정
router.post('/settings', function (req, res, next) {
    const setDifficulty = req.body.setDifficulty;
    const setReward = req.body.setReward;

    console.log('setDifficulty: ' + setDifficulty);
    console.log('setReward: ' + setReward);

    myChain.difficulty = parseInt(setDifficulty);
    myChain.miningReward = setReward;

    res.redirect('/blockchain');
});

// 지갑 화면 렌더링
router.get('/wallet', function (req, res, next) {
    res.render('wallet', {
        title: 'MyScan.io',
        txs: myChain.getAllTransactionOfWallet(wallet1),
        address: wallet1,
        balance: myChain.getBalance(wallet1),
    });
});

router.get('/createaccount', function (req, res, next) {
    const newKey = ec.genKeyPair();
    const newAccount = {
        'privateKey': newKey.getPrivate('hex'),
        'publicKey': newKey.getPublic('hex'),
        'walletAddress': newKey.getPublic('hex'),
    };

    // myChain.saveKeyStore();
    myChain.accounts.push(newAccount);

    res.redirect('/blockchain/accountlist');
});

module.exports = router;