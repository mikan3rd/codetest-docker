import { Injectable, Inject } from '@nestjs/common';
import { TransactionInput } from '../dto/input/transaction.input';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionUsecase {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  async create(transactionInput: TransactionInput) {
    const { user_id, amount, description } = transactionInput;

    const transaction = await this.transactionRepository.create(user_id, {
      amount,
      description,
    });

    return transaction;
  }
}
