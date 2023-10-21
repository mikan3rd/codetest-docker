import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { UserModule } from './modules/user.module';
import { TransactionModule } from './modules/transaction.module';

@Module({
  imports: [PrismaModule, UserModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
