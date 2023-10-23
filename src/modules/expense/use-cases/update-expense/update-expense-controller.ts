import { Request, Response } from 'express';
import { UpdateExpenseUseCase } from './update-expense-use-case';
import { container } from 'tsyringe';

export class UpdateExpenseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: expenseId } = req.params;
    const { amount, description } = req.body;

    const updateExpenseUseCase = container.resolve(UpdateExpenseUseCase);

    const expense = await updateExpenseUseCase.execute({
      id: expenseId,
      amount,
      description,
    });

    return res.status(200).json(expense);
  }
}
