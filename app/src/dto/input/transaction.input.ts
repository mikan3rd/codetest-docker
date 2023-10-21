import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class TransactionInput {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
