// SHA256 해시 알고리즘을 사용하기 위해 crypto-js 모듈 사용
const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// 트랜잭션 모델 정의
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = parseInt(amount);
        this.signature = undefined;
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

    signTransaction(privKey) {
        if (privKey.getPublic('hex') !== this.fromAddress) {
            console.log('ERR : No permission!');

            return false;
        }

        const hashTx = this.calculateHash();
        const sig = privKey.sign(hashTx, 'base64');
        
        this.signature = sig.toDER('hex');

        return true;
    }

    isValid() {
        // signature가 있는지 검사
        if(!this.signature || this.signature.length === 0) {
            console.log('Warn : No signature!');
            
            return false;
        }

        // 정상적으로 sign 되었는지 검사
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

module.exports = Transaction;