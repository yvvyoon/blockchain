const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');

async function getTranscationByAccount(myAccount, startBlockNum, endBlockNum) {
    console.log('');
    console.log('Transactions by account');
    console.log('Account: ' + myAccount);
    console.log('Block: ' + startBlockNum);
    console.log('');

    for (let i = startBlockNum; i <= endBlockNum; i++) {
        let block = await web3.eth.getBlock(i);

        // if (block.transactions.length > 0) {
        //     console.log(block);
        //
        //     break;
        // }

        if (block !== null && block.transactions !== null) {
            block.transactions.forEach(async(el) => {
                let tx = await web3.eth.getTransaction(el);

                // if (myAccount === tx.from || myAccount === tx.to) {
                    console.log('tx hash: ', tx.hash);
                    console.log('   nonce: ', tx.nonce);
                    console.log('   blockNumber: ', tx.blockNumber);
                    console.log('   from: ', tx.from);
                    console.log('   to: ', tx.to);
                    console.log('');
                // }
            });
        }
    }
}

// getTranscationByAccount('0xD2186F0504Aab6c73e51DCf7e03273BCa44deE15', 0, 300);

module.exports = getTranscationByAccount;