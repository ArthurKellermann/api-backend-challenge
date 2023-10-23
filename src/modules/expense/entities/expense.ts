import { randomUUID } from 'crypto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Expense {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  description: string;

  user_id: string;

  updated_at: Date;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
