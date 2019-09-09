pragma solidity ^0.5.8;

contract Vote {    
    address payable owner;
    uint8 numOfCandidate = 0;
    
    mapping(address => bool) isVoted;
    
    // 후보자별 투표 수
    mapping(string => uint) score;
    
    // 후보자 목록
    mapping(uint8 => string) candidateList;
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }
    
    modifier checkDupicate() {
        require (!isVoted[msg.sender]);
        _;
    }
    
    function addCandidate(string memory _candidate) public {
        bool found = false;

        for (uint8 i = 0; i < numOfCandidate; i++) {
            if (keccak256(bytes(candidateList[i])) == keccak256(bytes(_candidate))) {
                found = true;

                break;
            }
        }

        require (!found);

        candidateList[numOfCandidate] = _candidate;

        numOfCandidate ++;
    }
    
    function vote(string memory _candidate) public {
        if (isVoted[msg.sender] == false) {
             score[_candidate] ++;

             isVoted[msg.sender] = true;
        } else {
           
        }
    }
    
    function getNumOfCandidate() public view returns (uint8) {
        return numOfCandidate;
    }
    
    function getCandidate(uint8 _index) public view returns (string memory) {
        return candidateList[_index];
    }
    
    function getScore(string memory _candidate) public view returns (uint) {
        return score[_candidate];
    }
    
    // 컨트랙트 파기
    function killContract() public ownerOnly {
        selfdestruct(owner);
    }
}