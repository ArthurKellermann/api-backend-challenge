import { CreateExpenseDto } from '../dtos/create-expense-dto';
import { UpdateExpenseDto } from '../dtos/update-expense-dto';
import { Expense } from '../entities/expense';

export interface ExpenseRepository {
  create(data: CreateExpenseDto): Promise<Expense>;
  deleteById(id: string): Promise<void>;
  list(user_id): Promise<Expense[]>;
  updateById(data: UpdateExpenseDto): Promise<Expense>;
  findById(id: string): Promise<Expense>;
  getTotalExpenseAmount(user_id: string): Promise<number>;
}
