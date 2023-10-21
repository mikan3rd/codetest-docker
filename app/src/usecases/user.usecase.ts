import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserUsecase {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findByApiKey(apikey: string) {
    return this.userRepository.findByApiKey(apikey);
  }
}
