// SHA256 해시 알고리즘을 사용하기 위해 crypto-js 모듈 사용
const SHA256 = require('crypto-js/sha256');

// 블록 모델 정의
class Block {
    constructor(index, timestamp, transactions, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.curHash = this.calculateHash();
        this.nonce = 0;
        this.transactions = transactions;
    }

    // 해시값 계산
    calculateHash() {
        return SHA256(this.prevHash
            + this.timestamp
            + this.nonce
            + JSON.stringify(this.transactions)).toString();
    }

    // 블록 정보 출력
    printBlock() {
        // console.log('Block[' + this.index + ']');
        // console.log(' timestamp: ' + this.timestamp);
        // console.log(' prevHash: ' + this.prevHash);
        // console.log(' curHash: ' + this.curHash);
        // console.log(' nonce: ' + this.nonce);
        // // 단순 문자열과 객체를 함께 출력하고자 할 때는 콤마 사용해야 함
        // console.log(' data: ', this.transactions);
        console.log(JSON.stringify(this, null, 2));
    }

    miningBlock(difficulty) {
        while (this.curHash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.curHash = this.calculateHash();

            // console.log("Mining...", this.nonce, "...", this.curHash);
        }
    }

    hasValidTransactions() {
        for (let tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        
        return true;
    }
}

module.exports = Block;