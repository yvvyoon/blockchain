const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [new Block(0, Date.now(), [], 'genesisBlock')];
    }

    // 배열이기 때문에 반복하여 출력
    printAllBlockchain() {
        this.chain.map((block, index) => {
            console.log('--------------------------------------------');
            block.printBlock();
        });
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(block) {
        // 추가할 블록의 prevHash와 curHash를 저장
        block.prevHash = this.getLatestBlock().curHash;
        block.curHash = block.calculateHash();
        this.chain.push(block);
    }

    // 체인의 무결성 검증
    // 제네시스블록을 제외하고 1번 블록부터 최종 블록까지 잘 연결되어 있는가
    isChainValid() {
        let validFlag = true;

        for (let i = 1; i < this.chain.length; i++) {
            const curBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            // 현재 블록의 해시를 재계산하여
            // 현재 블록 객체에 할당된 curHash와 일치 여부 검증
            if (curBlock.curHash !== curBlock.calculateHash()) {
                console.log('ERR001: "현재 블록 해시값 불일치"');
                console.log('Block[' + i + ']');
                validFlag = false;
            }

            // 이전 블록의 해시와 prevHash 일치 여부 검증
            if (curBlock.prevHash !== prevBlock.curHash) {
                console.log('ERR002: "이전 블록 해시값 불일치"');
                console.log('Block[' + i + ']');
                validFlag = false;
            }
        }

        if (validFlag === false) {
            return '놉';
        } else {
            return '넹';
        }
    }
}

module.exports = Blockchain;