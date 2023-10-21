import { Injectable } from '@nestjs/common';
import { PrismaService } from '../interfaces/services/prisma.service';
import { Prisma } from '@prisma/client';
import { TransactionAmountExceeded } from '../interfaces/exceptions/transaction.exception';

const MAX_AMOUNT = 1000;

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  // Optimistic Concurrency Control
  async create(
    userId: number,
    data: Pick<Prisma.TransactionCreateInput, 'amount' | 'description'>,
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      const result = await prisma.transaction.aggregate({
        where: { user_id: userId },
        _sum: { amount: true },
      });

      if (result._sum.amount + data.amount > MAX_AMOUNT) {
        throw new TransactionAmountExceeded();
      }

      const latestTransaction = await prisma.transaction.findFirst({
        where: { user_id: userId },
        orderBy: { version: 'desc' },
      });

      const latestVersion = latestTransaction?.version ?? 0;

      return await prisma.transaction.create({
        data: {
          user: { connect: { id: userId } },
          version: latestVersion + 1,
          ...data,
        },
      });
    });
  }

  // Locking
  // async create(
  //   userId: number,
  //   data: Pick<Prisma.transactionsCreateInput, 'amount' | 'description'>,
  // ) {
  //   return await this.prisma.$transaction(async (prisma) => {
  //     const [result] = await prisma.$queryRaw<{ totalAmount: string }[]>`
  //       SELECT SUM(amount) as totalAmount
  //       FROM transactions
  //       WHERE user_id = ${userId}
  //       FOR UPDATE;
  //     `;

  //     if (Number(result.totalAmount) + data.amount > MAX_AMOUNT) {
  //       throw new TransactionAmountExceeded();
  //     }

  //     return prisma.transactions.create({
  //       data: {
  //         users: { connect: { id: userId } },
  //         ...data,
  //       },
  //     });
  //   });
  // }
}
