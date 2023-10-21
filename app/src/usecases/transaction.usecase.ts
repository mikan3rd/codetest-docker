import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionInput } from '../dto/input/transaction.input';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionAmountExceeded } from '../interfaces/exceptions/transaction.exception';
import { users } from '@prisma/client';

@Injectable()
export class TransactionUsecase {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  async create(args: { transactionInput: TransactionInput; user: users }) {
    const {
      transactionInput: { user_id, ...data },
      user,
    } = args;

    if (user_id !== user.id) {
      throw new HttpException('user_id is invalid', HttpStatus.BAD_REQUEST);
    }

    const transaction = await this.transactionRepository
      .createWithLock(user_id, data)
      .catch((error) => {
        if (error instanceof TransactionAmountExceeded) {
          throw new HttpException(
            TransactionAmountExceeded.name,
            HttpStatus.PAYMENT_REQUIRED,
          );
        }

        console.error(error);
        throw new HttpException(
          'Create transaction failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return transaction;
  }
}
