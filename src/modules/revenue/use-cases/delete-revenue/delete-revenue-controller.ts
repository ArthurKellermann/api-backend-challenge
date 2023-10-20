import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteRevenueUseCase } from './delete-revenue-use-case';

export class DeleteRevenueController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteRevenueUseCase = container.resolve(DeleteRevenueUseCase);

    await deleteRevenueUseCase.execute(id);

    return res.status(200).send();
  }
}
