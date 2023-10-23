import { User } from '../../account/entities/user';
import { Expense } from '../entities/expense';

export class ExpenseMapper {
  static toDomain(expense: Expense, user: User) {
    return {
      expense: {
        id: expense.id,
        title: expense.title,
        amount: expense.amount,
        description: expense.description,
        updated_at: expense.updated_at,
        created_at: expense.created_at,
      },
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    };
  }
}
