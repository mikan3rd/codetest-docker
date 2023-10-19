import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { TransactionModule } from './modules/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
