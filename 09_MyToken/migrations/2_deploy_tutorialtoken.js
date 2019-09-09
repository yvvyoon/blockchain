var TutorialToken = artifacts.require("./TutorialToken.sol");

const _name = 'TutorialToken';
const _symbol = 'TTK';
const _decimals = 18;
const _initialSupply = 10000;

module.exports = function(deployer) {
  deployer.deploy(TutorialToken, _name, _symbol, _decimals, _initialSupply);
};