import { container } from 'tsyringe';
import { CreateExpenseUseCase } from './create-expense-use-case';
import { Request, Response } from 'express';
import { ExpenseMapper } from '../../mappers/expense-mapper';

export class CreateExpenseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { amount, description, title } = req.body;
    const { id: user_id } = req.user;

    const createExpenseUseCase = container.resolve(CreateExpenseUseCase);

    const { expense, user } = await createExpenseUseCase.execute({
      amount,
      description,
      title,
      user_id,
    });

    return res.status(201).json(ExpenseMapper.toDomain(expense, user));
  }
}
