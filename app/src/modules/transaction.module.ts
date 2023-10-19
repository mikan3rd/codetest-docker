import { Module } from '@nestjs/common';
import { TransactionService } from '../usecases/transaction.usecase';
import { TransactionController } from '../controllers/transaction.controller';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
