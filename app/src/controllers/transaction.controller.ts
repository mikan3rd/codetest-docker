import { Controller, Post } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(): string {
    return this.transactionService.getHello();
  }
}
