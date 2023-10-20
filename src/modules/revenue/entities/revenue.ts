import { randomUUID } from 'crypto';

export class Revenue {
  id: string;
  title: string;
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
