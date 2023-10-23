import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteExpenseUseCase } from './delete-expense-use-case';

export class DeleteExpenseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const deleteExpenseUseCase = container.resolve(DeleteExpenseUseCase);

    const balance = await deleteExpenseUseCase.execute({
      expense_id: id,
      user_id,
    });

    return res.status(200).json({
      message: 'Expense successfully deleted',
      current_balance: balance,
    });
  }
}
