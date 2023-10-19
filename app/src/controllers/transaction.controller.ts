import { Controller, Post } from '@nestjs/common';
import { TransactionUsecase } from '../usecases/transaction.usecase';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionUsecase: TransactionUsecase) {}

  @Post()
  create(): string {
    return this.transactionUsecase.getHello();
  }
}
