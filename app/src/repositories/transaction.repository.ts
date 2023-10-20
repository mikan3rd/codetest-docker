import { Injectable } from '@nestjs/common';
import { PrismaService } from '../interfaces/services/prisma.service';
import { Prisma } from '@prisma/client';
import { TransactionAmountExceeded } from '../interfaces/exceptions/transaction.exception';

const MAX_AMOUNT = 1000;

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    data: Omit<Prisma.transactionsCreateInput, 'users'>,
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      const totalAmount = await prisma.transactions.aggregate({
        where: { user_id: userId },
        _sum: { amount: true },
      });

      if (totalAmount._sum.amount + data.amount > MAX_AMOUNT) {
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
