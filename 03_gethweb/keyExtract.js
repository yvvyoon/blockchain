// const express = require('express');
// const router = express.Router();
const Web3 = require('web3');

// 구동 중인 geth 서버로 Web3 객체 생성
const web3 = new Web3('http://localhost:8545');
const keystore = {
    "address": "d2186f0504aab6c73e51dcf7e03273bca44dee15",
    "crypto":
        {
            "cipher": "aes-128-ctr",
            "ciphertext": "aded1886986f6e2ff6d75e5476b4139428cd76fc0429c8505aea65555973a1e4",
            "cipherparams": {
                "iv": "b1911190006cadaea9cec934918f779c"
            },
            "kdf": "scrypt",
            "kdfparams":
                {
                    "dklen": 32,
                    "n": 262144,
                    "p": 1,
                    "r": 8,
                    "salt": "0f05fe342d981bd740cefdf2146347472d185f9dbe093e4dc0f74441f3227ea6"
                },
            "mac": "6bfdac66925e2ec9259b97d91dc2aedf2c9dc2c0c425050c4b2e9b2095caa4cb"
        },
    "id": "59412b8f-be87-4966-9cf3-03c38a2837a4",
    "version": 3
};
const decryptAccount = web3.eth.accounts.decrypt(keystore, 'fhtksnsk92!');

console.log(decryptAccount.privateKey);

// private key : 0xf7d2f177adbec083ee301bb280ff8b24e2a59a93eb852fdb779ca20721c07dea

const fromAddress = '0xd2186f0504aab6c73e51dcf7e03273bca44dee15';
const toAddress = '0xb4fc478ae7538a7e5ff0a3a7360bb09c8af3805b';
const amount = web3.utils.toHex(1111121211);

async function sendTransaction(fromAddress, toAddress, amount) {
    const txParams = {
        from: fromAddress,
        to: toAddress,
        value: amount,
        gas: web3.utils.toHex(0x21000),
    };

    const signedTx = await decryptAccount.signTransaction(txParams);

    console.log(signedTx);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        // 마이닝이 완료되면 발생하는 transactionHash 호출
        .once('transactionHash', (hash) => {
            console.log(hash);
        })
}

// sendTransaction(fromAddress, toAddress, amount);

module.exports = sendTransaction;