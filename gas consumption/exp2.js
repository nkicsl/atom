var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));

var Addr = '0x39a9d3744c0903a1bc073e3ee681a2e8ca498794';
var Abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newImplementation",
				"type": "address"
			}
		],
		"name": "upgradeTo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "implementation",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
];

async function excute() {

    var Contract = new web3.eth.Contract(Abi, Addr);

    Contract.methods.upgradeTo('0x8321e0a73a149a046b220dc67006f1f7c9a19521').send({ from: accounts[0] }).on('receipt', function (receipt) {
        console.log(receipt);
    });

}

async function main() {
    accounts = await web3.eth.getAccounts();
    console.log("get accounts success!");
    excute();
}

main();