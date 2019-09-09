pragma solidity ^0.5.8;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';

// ERC20Detailed와 ERC20 컨트랙트를 상속받음
contract TutorialToken is ERC20Detailed, ERC20 {
    // 토큰 최초 발행량
    // 1000^18개
    uint public initialSupply = 1000e18;
    
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint _initialSupply) 
        // 상위 컨트랙트의 생성자 호출
        ERC20Detailed(_name, _symbol, _decimals) public {
            // **는 거듭제곱을 표현
            initialSupply = _initialSupply ** uint(_decimals);
           // console.log('initialSupply: ' + initialSupply);
            
            // [정의] 화폐를 주주하다.
            // mintable token : 최초 발행 후 추가로 발행이 가능한 토큰
            _mint(msg.sender, initialSupply);
        }
}