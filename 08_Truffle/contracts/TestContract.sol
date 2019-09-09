pragma solidity ^0.5.8;

contract TestContract {
    string value;
    
    constructor() public {
        
    }
    
    function setValue (string memory _value) public {
        value = _value;
    }
    
    function getValue() public view returns (string memory) {
        return value;
    }
}