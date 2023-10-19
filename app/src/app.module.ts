import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { TransactionModule } from './modules/transaction.module';

@Module({
  imports: [PrismaModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
