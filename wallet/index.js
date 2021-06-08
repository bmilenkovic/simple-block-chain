const ChainUtil = require('../chain-util');
const Transaction = require('./transaction')
const { INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet - 
          publicKey: ${this.publicKey.toString()}
          balance:   ${this.balance}`
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recepient, amount, transactionalPool) {
        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds current balance`);
            return;
        }
        let transaction = transactionalPool.existingTransaction(this.publicKey);

        if (transaction) {
            transaction.update(this, recepient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recepient, amount);
            transactionalPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

}

module.exports = Wallet;