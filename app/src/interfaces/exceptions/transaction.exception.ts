export class TransactionAmountExceeded extends Error {
  constructor() {
    super('Transaction amount exceeded');
    this.name = 'TransactionAmountExceeded';
  }
}
