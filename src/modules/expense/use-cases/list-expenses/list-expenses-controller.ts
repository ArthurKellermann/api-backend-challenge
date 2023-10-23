import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListExpensesUseCase } from './list-expenses-use-case';

export class ListExpensesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listExpensesUseCase = container.resolve(ListExpensesUseCase);

    const expenses = await listExpensesUseCase.execute(id);

    return res.status(200).json(expenses);
  }
}
