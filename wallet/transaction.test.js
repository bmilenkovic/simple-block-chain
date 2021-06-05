const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
    let transaction, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
          .toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
          .toEqual(amount);
    });

    it('inputs the balance of the wallet', () => {
       expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('validates a valid transaction', () => {
      expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('invalidates a corrupt transaction', () => {
      transaction.outputs[0].amount = 50000;
      expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });

    describe('transacting with an amount that exceeds the balance', () => {
      beforeEach(() => {
        amount = 50000;
        transaction = Transaction.newTransaction(wallet, recipient, amount);
      });
  
      it('does not create the transaction', () => {
        expect(transaction).toEqual(undefined);
      });
    });

    describe('and updating a transaction', () => {
      let nextAmount, nextRecepient;

      beforeEach(() => {
        nextAmount = 20;
        nextRecepient = 'n3xt-4ddr355';
        transaction = transaction.update(wallet, nextRecepient, nextAmount);
      });

      it(`substracts the next amount from sender's`, () => {
         expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
         .toEqual(wallet.balance - amount - nextAmount);
      });

      it(`outputs an amount for the next recepient`, () => {
        expect(transaction.outputs.find(output => output.address === nextRecepient).amount)
        .toEqual(nextAmount);
     });

    });
    
});