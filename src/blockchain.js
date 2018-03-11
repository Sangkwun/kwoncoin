const CryptoJS = require("crypto-js");

class Block {
    constructor(index, hash, prevHash, timestamp, data ){
        this.index = index;
        this.hash = hash;
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}

const genesisBlock = new Block(
  0,
  "ACB1FE460D309B18326FC03D4371C4E2F042CE970BBF603DF6E9A2391DE8946D",
  null,
  1520671590.24,
  "The genesis block"
);

let blockchain = [genesisBlock];

const getLastBlock = () => blockchain[blockchain.length - 1];

const getTimeStamp = () => new Date().getTime()/1000;

const getBlockChain = () => blockchain;

const createHash = (index, prevHash, timestamp, data) => 
    CryptoJS.SHA256(index + prevHash + timestamp + JSON.stringify(data)).toString();

const createNewBlock = data => {

    const prevBlock = getLastBlock();
    const newBlockIndex = prevBlock.index + 1;
    const newTimeStamp = getTimeStamp();
    const newHash = createHash(
        newBlockIndex,
        prevBlock.hash,
        newTimeStamp,
        data
    );

    const newBlock = new Block(
        newBlockIndex,
        newHash,
        prevBlock.hash,
        newTimeStamp,
        data
    )
    addBlockToChain(newBlock);
    return newBlock;
}

const getBlockHash = (block) => createHash(block.index, block.prevHash, block.timestamp, block.data);

const isNewBlockValid = (candidateBlock, latestBlock) => {
    if(!isNewStructureValid(candidateBlock)){
        console.log("Candidate block structure is not valid");
        return false;
    }
    else if(latestBlock.index + 1 !== candidateBlock.index){
        console.log("Candidate block doesn't have valid index");
        return false;

    } else if (latestBlock.hash !== candidateBlock.prevHash ){
        console.log("Previous hash of candidate is not valid");
        return false;
        
    } else if (getBlockHash(candidateBlock) !== candidateBlock.hash) {
        console.log("The hash of this block is invalid")
        return false;
    }
    return true;
}

const isNewStructureValid = (block) => {
    return (
        typeof block.index === 'number' && 
        typeof block.hash === 'string' && 
        typeof block.prevHash === 'string' &&
        typeof block.timestamp === 'number' &&
        typeof block.data === 'string'
    )
}

const isChainValid = candidateChain => {
    const isGenesisBlock = block => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    }
    if(!isGenesisBlock(candidateChain[0])){
        console.log("The candidate chain's genesis block is not same with ours")
        return false
    }
    for(let i=1; i < candidateChain.length; i++){
        if(!isNewBlockValid(candidateChain[i], candidateChain[i-1])){
            return false;
        }
    }
    return true;
}

const replaceChain = candidateChain => {
    if (isChainValid(candidateChain) && candidateChain.length > getBlockChain().length) {
        blockchain = candidateChain;
        return true;
    }else{
        return false;
    }
};

const addBlockToChain = candidateBlock => {
    if (isNewBlockValid(candidateBlock, getLastBlock())) {
        blockchain.push(candidateBlock);
        return true;
    }else{
        return false;
    }
}

module.exports = {
    getBlockChain,
    createNewBlock
}