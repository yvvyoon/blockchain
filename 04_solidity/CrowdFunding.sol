pragma solidity ^0.5.8;

contract CrowdFunding {
    struct Investor {
        address payable addr;
        uint amount;
    }
    
    mapping(uint => Investor) public investors;
    uint goalAmount;
    uint totalAmount;
    // owner에 transfer()를 사용해야 하기 때문에 payable
    address payable owner;
    uint numOfInvestors = 0;
    
    constructor(uint _goalAmount) public payable {
        // constructor()는 deploy와 동시에 호출되는 함수이므로
        // constructor() 내의 msg.sender와 fund() 내의 msg.sender는 다름
        // deploy하는 주체가 곧, 펀딩을 주최한 사람
        owner = msg.sender;
        goalAmount = _goalAmount;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function fund() public payable {
        // msg.sender : fund()를 호출한 주체의 주소
        // msg.value : fund()를 호출할 때 전달하는 값
        investors[numOfInvestors] = Investor(msg.sender, msg.value);
        
        numOfInvestors += 1;
        
        totalAmount += investors[numOfInvestors].amount;
    }
    
    function checkGoalFunding() public payable onlyOwner {
        // 
        if (totalAmount >= goalAmount) {
            owner.transfer(address(this).balance);
        } else {
            for (uint i = 0; i < numOfInvestors; i++) {
                investors[i].addr.transfer(investors[i].amount);
            }
        }
    }
    
    function killContract() public onlyOwner {
        selfdestruct(owner);
    }
}