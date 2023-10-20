import { Injectable } from '@nestjs/common';

type TransactionType = {
  user_id: number;
  amount: number;
  description: string;
};

@Injectable()
export class TransactionUsecase {
  create(transaction: TransactionType): string {
    console.log(transaction);
    return 'Hello World?';
  }
}
