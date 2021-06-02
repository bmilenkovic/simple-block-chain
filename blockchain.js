const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            console.log('Failed on Genesis check');
            return false;
        }
        for (let i = 1; i < chain.length; i++ ) {
            const block = chain[i];
            const lastBlock = chain[i-1];
            
            if (block.lastHash !== lastBlock.hash) {
                console.log('failed on prev block');
                return false;
            } else if (block.hash !== Block.blockHash(block)) {
                console.log('failed on current block');
                return false;
            }
        }
        
        return true;
    }
}

module.exports = Blockchain;