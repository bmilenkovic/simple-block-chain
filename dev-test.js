const Blockchain = require('./blockchain');
const Block = require('./blockchain');

// const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
// console.log(fooBlock.toString());

const bc = new Blockchain();
for (let i=0; i<10; i++) {
    console.log(bc.addBlock(`foo ${i}`).toString());
}