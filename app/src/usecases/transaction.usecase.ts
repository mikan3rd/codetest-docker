import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionUsecase {
  getHello(): string {
    return 'Hello World?';
  }
}
