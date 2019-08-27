const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// 키 generate
const key = ec.genKeyPair();
const msgHash = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const signature = key.sign(msgHash);
const derSign = signature.toDER();

console.log('signDER: ', derSign);
console.log(key.verify(msgHash, derSign));

console.log('PrivateKey = ', key.getPrivate('hex'));
console.log('PublicKey = ', key.getPublic('hex'));