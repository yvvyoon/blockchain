pragma solidity ^0.5.8;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';

contract YYWToken is ERC20Detailed, ERC20 {
    uint public initialSupply = 10000;

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _initialSupply)
        ERC20Detailed(_name, _symbol, _decimals) public {
            initialSupply = _initialSupply ** uint(_decimals);

            _mint(msg.sender, initialSupply);
        }
}