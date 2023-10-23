import { inject, injectable } from 'tsyringe';
import { ExpenseRepository } from '../../repositories/expense-repository';
import { UsersRepository } from '../../../account/repositories/users-repository';

interface CreateExpenseRequest {
  title: string;
  amount: number;
  description: string;
  user_id: string;
}

@injectable()
export class CreateExpenseUseCase {
  constructor(
    @inject('PrismaExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ amount, description, title, user_id }: CreateExpenseRequest) {
    const expense = await this.expenseRepository.create({
      amount,
      description,
      title,
      user_id,
    });

    const user = await this.usersRepository.findById(user_id);

    user.balance -= expense.amount;

    const balance = await this.usersRepository.updateBalance({
      balance: user.balance,
      id: user.id,
    });

    return { expense, user, balance };
  }
}
