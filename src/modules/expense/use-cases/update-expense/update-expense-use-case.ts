import { inject, injectable } from 'tsyringe';
import { ExpenseRepository } from '../../repositories/expense-repository';
import { UsersRepository } from '../../../account/repositories/users-repository';

interface UpdateExpenseRequest {
  id: string;
  amount?: number;
  description?: string;
}

@injectable()
export class UpdateExpenseUseCase {
  constructor(
    @inject('PrismaExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ id, amount, description }: UpdateExpenseRequest) {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      throw new Error('Expense does not exists');
    }

    const user = await this.usersRepository.findById(expense.user_id);

    const difference = amount - expense.amount;
    user.balance -= difference;

    await this.usersRepository.updateBalance({
      id: user.id,
      balance: user.balance,
    });

    const updatedExpense = await this.expenseRepository.updateById({
      id,
      amount,
      description,
    });

    return updatedExpense;
  }
}
