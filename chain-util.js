const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuidv1 = require('uuid');


class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id () {
        return uuidv1.v1();
    }

    static hash(data) {
        return SHA256(JSON.stringify(data).toString());
    }
}


module.exports = ChainUtil;