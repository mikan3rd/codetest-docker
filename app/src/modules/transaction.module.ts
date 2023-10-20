import { Module } from '@nestjs/common';
import { TransactionUsecase } from '../usecases/transaction.usecase';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionRepository } from '../repositories/transaction.repository';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionUsecase],
})
export class TransactionModule {}
