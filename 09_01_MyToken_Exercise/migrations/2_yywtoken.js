var YYWToken = artifacts.require("./YYWToken.sol");

const _name = 'YYWToken';
const _symbol = 'YYW';
const _decimals = 18;
const _initialSupply = 10000;

module.exports = function(deployer) {
  deployer.deploy(YYWToken, _name, _symbol, _decimals, _initialSupply);
};
