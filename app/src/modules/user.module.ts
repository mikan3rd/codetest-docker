import { Global, Module } from '@nestjs/common';
import { UserUsecase } from '../usecases/user.usecase';
import { UserRepository } from '../repositories/user.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository, UserUsecase],
})
export class UserModule {}
