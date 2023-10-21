import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransactionUsecase } from '../usecases/transaction.usecase';
import { TransactionInput } from '../dto/input/transaction.input';
import { AuthGuard, AuthGuardRequest } from '../interfaces/guards/auth.guards';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionUsecase: TransactionUsecase) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Request() req: AuthGuardRequest,
    @Body() transactionInput: TransactionInput,
  ) {
    const { user } = req;
    return this.transactionUsecase.create({ transactionInput, user });
  }
}
