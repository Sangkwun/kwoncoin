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

console.log(blockchain)