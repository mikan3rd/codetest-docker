import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TransactionUsecase } from '../usecases/transaction.usecase';
import { TransactionInput } from '../dto/input/transaction.input';
import { AuthGuard } from '../interfaces/guards/auth.guards';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionUsecase: TransactionUsecase) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() transactionInput: TransactionInput) {
    return this.transactionUsecase.create(transactionInput);
  }
}
