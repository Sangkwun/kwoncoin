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

const createHash = (index, prevHash, timestamp, data) => 
    CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

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

    return newBlock;
}

console.log(blockchain)