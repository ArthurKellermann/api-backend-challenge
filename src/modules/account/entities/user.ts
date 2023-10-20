import { randomUUID } from 'crypto';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  updated_at: Date;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
    if (!this.balance) {
      this.balance = 0;
    }
  }
}
