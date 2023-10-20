import { Module } from '@nestjs/common';
import { TransactionUsecase } from '../usecases/transaction.usecase';
import { TransactionController } from '../controllers/transaction.controller';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionUsecase],
})
export class TransactionModule {}
