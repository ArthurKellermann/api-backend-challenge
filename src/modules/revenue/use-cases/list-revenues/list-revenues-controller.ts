import { container } from 'tsyringe';
import { ListRevenuesUseCase } from './list-revenues-use-case';
import { Request, Response } from 'express';

export class ListRevenuesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRevenuesUseCase = container.resolve(ListRevenuesUseCase);

    const revenues = await listRevenuesUseCase.execute();

    return res.status(200).json(revenues);
  }
}
