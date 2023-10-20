import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionUsecase } from '../usecases/transaction.usecase';
import { TransactionInput } from '../dto/input/transaction.input';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionUsecase: TransactionUsecase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() transactionInput: TransactionInput) {
    return this.transactionUsecase.create(transactionInput);
  }
}
