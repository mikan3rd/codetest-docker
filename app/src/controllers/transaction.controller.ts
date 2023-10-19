import { Controller, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(): string {
    return this.appService.getHello();
  }
}
