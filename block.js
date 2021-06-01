class Block {
    constructor(timestamp, lastHash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
    }

    toString() {
        return `Block -
         Timestamp  : ${this.timestamp}
         Last Hash  : ${this.lastHash.substring(0, 10)}
         Data       : ${this.data}`;   
      }
}

module.exports = Block;