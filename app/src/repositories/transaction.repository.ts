import { Injectable } from '@nestjs/common';
import { PrismaService } from '../interfaces/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    data: Omit<Prisma.transactionsCreateInput, 'users'>,
  ) {
    return this.prisma.transactions.create({
      data: {
        users: { connect: { id: userId } },
        ...data,
      },
    });
  }
}
