import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionInput } from '../dto/input/transaction.input';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionAmountExceeded } from '../interfaces/exceptions/transaction.exception';

@Injectable()
export class TransactionUsecase {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  async create(transactionInput: TransactionInput) {
    const { user_id, amount, description } = transactionInput;

    const transaction = await this.transactionRepository
      .create(user_id, {
        amount,
        description,
      })
      .catch((error) => {
        if (error instanceof TransactionAmountExceeded) {
          throw new HttpException(
            TransactionAmountExceeded.name,
            HttpStatus.PAYMENT_REQUIRED,
          );
        }

        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return transaction;
  }
}
