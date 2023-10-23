import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTransactionsUseCase } from './list-transactions-use-case';

export class ListTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const listTransactionsUseCase = container.resolve(ListTransactionsUseCase);

    const transactions = await listTransactionsUseCase.execute(user_id);

    return res.status(200).json(transactions);
  }
}
