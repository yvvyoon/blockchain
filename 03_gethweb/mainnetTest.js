const Web3 = require('web3');

const web3 = new Web3('https://mainnet.infura.io');

web3.eth.getBlockNumber()
.then(number => {
    console.log(number);

    web3.eth.getBlock(number)
        .then(block => {
            console.log(block);
        });
});

web3.eth.getTransaction('0x1d98da1b9d8f6428719985694bc09a0ad00e5cf20a7b4374decc3f6a72ae1392')
.then(tx => {
    console.log(tx);
});