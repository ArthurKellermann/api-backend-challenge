import { randomUUID } from 'crypto';

export class Revenue {
  id: string;
  title: string;
  amount: number;
  description: string;
  user_id: string;
  updated_at: string;
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
