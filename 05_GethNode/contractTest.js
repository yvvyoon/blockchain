const Web3 = require('web3');

const web3 = new Web3('http://localhost:8545');
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "string"
			}
		],
		"name": "setValue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_value",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0xdb0de1fed6a8f046ca86673ef680f0fbcd78d1b6';
const helloContract = new web3.eth.Contract(abi, contractAddress);

// helloContract.methods.getValue().call()
// 	.then(result => {
// 		console.log(result);
// 	})
// 	.catch(err => {
// 		console.error(err);
// 	});

async function hello() {
	let result = await helloContract.methods.getValue.call();

	console.log(result);
}

hello();

async function sendTest() {
	let result = await helloContract.methods.setValue('128390128309').send({ from: '0x756D6c4c303E1736662663bC1C12eef4AF15Ef96' });

	console.log(result);
}

sendTest();