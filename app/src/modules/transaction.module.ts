import { Module } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { TransactionController } from '../controllers/transaction.controller';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [AppService],
})
export class TransactionModule {}
