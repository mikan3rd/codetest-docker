import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TransactionController } from '../controllers/transaction.controller';

@Module({
  imports: [],
  controllers: [AppController, TransactionController],
  providers: [AppService],
})
export class AppModule {}
