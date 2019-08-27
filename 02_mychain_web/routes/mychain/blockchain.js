const Block = require('./block');
const Transaction = require('./transaction');
const fs = require('fs');

class Blockchain {
    constructor() {
        this.difficulty = 2;
        this.miningReward = 100;
        this.chain = [new Block(0, Date.now(), [], 'genesisBlock')];
        // 블록 생성 전 대기 중인 트랜잭션 배열
        this.pendingTransactions = [];
        // 계정 정보 배열
        this.accounts = [];
    }

    // 배열이기 때문에 반복하여 출력
    printAllBlockchain() {
        this.chain.map((block, index) => {
            console.log('--------------------------------------------');
            block.printBlock();
        });
    }

    printBlockchain() {
        console.log(JSON.stringify(this, null, 2));
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    // addBlock(block) {
    //     // 추가할 블록의 prevHash와 curHash를 저장
    //     block.prevHash = this.getLatestBlock().curHash;
    //     block.curHash = block.calculateHash();
    //     this.chain.push(block);
    // }

    // 체인의 무결성 검증
    // 제네시스블록을 제외하고 1번 블록부터 최종 블록까지 잘 연결되어 있는가
    isChainValid() {
        let validFlag = true;

        console.log('--------------------------------------------');

        for (let i = 1; i < this.chain.length; i++) {
            const curBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            // 현재 블록의 해시를 재계산하여
            // 현재 블록 객체에 할당된 curHash와 일치 여부 검증
            if (curBlock.curHash !== curBlock.calculateHash()) {
                console.log('ERR001: "현재 블록 해시값 불일치"');
                console.log('Block[' + i + ']');

                validFlag = false;
            }

            // 이전 블록의 해시와 prevHash 일치 여부 검증
            if (curBlock.prevHash !== prevBlock.curHash) {
                console.log('ERR002: "이전 블록 해시값 불일치"');
                console.log('Block[' + i + ']');

                validFlag = false;
            }
        }

        if (validFlag === false) {
            return '놉';
        } else {
            return '넹';
        }
    }

    addTransaction(transaction) {
        // 입출금 주소 검증
        if (!transaction.fromAddress || !transaction.toAddress) {
            console.log('Warn : Invalid transaction address!');
            
            return false;
        }

        // 트랜잭션 유효성 검증
        if (!transaction.isValid()) {
            console.log('Warn : Invalid transaction!');
            
            return false;
        }

        // 펜딩 트랜잭션에 추가
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(rewardAddress) {
        // unshift() : 현재 배열을 뒤로 미루고, 앞에 강제로 데이터 추가
        this.pendingTransactions.unshift(new Transaction(null, rewardAddress, this.miningReward));

        let block = new Block(
            this.getLatestBlock().index + 1,
            Date.now(),
            this.pendingTransactions,
            this.getLatestBlock().curHash,
        );

        block.miningBlock(this.difficulty);

        console.log('Mined...');
        
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    getBalance(address) {
        let balance = 0;

        for (let block of this.chain) {
            for (let tx of block.transactions) {
                if (tx.fromAddress === address) {
                    balance -= tx.amount;
                }
                
                if (tx.toAddress === address) {
                    balance += tx.amount;
                }
            }
        }
        
        return balance;
    }

    getAllTransactionOfWallet(address) {
        const txs = [];

        for (let block of this.chain) {
            for (let tx of block.transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }

        return txs;
    }

    // loadKeyStore() {
    //     if (fs.existsSync('./routes/mychain/keystore.json')) {
    //         let rawData = fs.readFileSync('./routes/mychain/keystore.json');
    //         let accountList = JSON.parse(rawData);
    //
    //         // keystore.json 파일의 계정 정보를 읽어서 accounts 배열에 저장
    //         this.accounts = accountList;
    //     }
    // }
    //
    // saveKeyStore() {
    //     fs.writeFileSync('./routes/mychain/keystore.json', this.accounts);
    // }
}

module.exports = Blockchain;