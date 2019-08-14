// SHA256 해시 알고리즘을 사용하기 위해 crypto-js 모듈 사용
const SHA256 = require('crypto-js/sha256');

// 트랜잭션 모델 정의
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    // 해시값 계산
    calculateHash() {
        return SHA256(this.fromAddress
            + this.toAddress
            + this.amount).toString();
    }

    // 트랜잭션 정보 출력
    printTransaction() {
        // console.log('from: ', this.fromAddress);
        // console.log('to: ', this.toAddress);
        // console.log('amount: ', this.amount);
        console.log(JSON.stringify(this, null, 2));
    }
}

module.exports = Transaction;