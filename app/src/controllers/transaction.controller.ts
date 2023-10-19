import { Controller, Post, Body } from '@nestjs/common';
import { TransactionUsecase } from '../usecases/transaction.usecase';
import { TransactionInput } from 'src/dto/input/transaction.input';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionUsecase: TransactionUsecase) {}

  @Post()
  create(@Body() transactionInput: TransactionInput): string {
    return this.transactionUsecase.create(transactionInput);
  }
}
