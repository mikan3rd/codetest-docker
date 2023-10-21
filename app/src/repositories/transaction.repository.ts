import { Injectable } from '@nestjs/common';
import { PrismaService } from '../interfaces/services/prisma.service';
import { Prisma } from '@prisma/client';
import { TransactionAmountExceeded } from '../interfaces/exceptions/transaction.exception';

const MAX_AMOUNT = 1000;

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async createWithLock(
    userId: number,
    data: Omit<Prisma.transactionsCreateInput, 'users'>,
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      const [result] = await prisma.$queryRaw<{ totalAmount: string }[]>`
        SELECT SUM(amount) as totalAmount
        FROM transactions
        WHERE user_id = ${userId}
        FOR UPDATE;
      `;

      if (Number(result.totalAmount) + data.amount > MAX_AMOUNT) {
        throw new TransactionAmountExceeded();
      }

      return prisma.transactions.create({
        data: {
          users: { connect: { id: userId } },
          ...data,
        },
      });
    });
  }
}
