import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionInput } from '../dto/input/transaction.input';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionAmountExceeded } from '../interfaces/exceptions/transaction.exception';
import { User, Transaction, Prisma } from '@prisma/client';

const MAX_RETRIES = 10;

@Injectable()
export class TransactionUsecase {
  constructor(
    @Inject(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  async create(args: { transactionInput: TransactionInput; user: User }) {
    const {
      transactionInput: { user_id, ...data },
      user,
    } = args;

    if (user_id !== user.id) {
      throw new HttpException('user_id is invalid', HttpStatus.BAD_REQUEST);
    }

    let transaction: Transaction;
    const RetryCounts = Array.from({ length: MAX_RETRIES }, (_, i) => i + 1);
    for (const retryCount of RetryCounts) {
      if (retryCount > 0) {
        console.warn(
          `user_id: ${user_id}, Retrying... (${retryCount}/${MAX_RETRIES})`,
        );
      }

      transaction = await this.transactionRepository
        .create(user_id, data)
        .catch((error) => {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Unique constraint failed or Transaction failed
            if (error.code === 'P2002' || error.code === 'P2034') {
              if (retryCount < MAX_RETRIES) {
                return null;
              }
              throw new HttpException(
                'Duplicate transaction',
                HttpStatus.CONFLICT,
              );
            }
          }

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

      if (transaction) {
        break;
      }
    }

    return transaction;
  }
}
