import { Request, Response } from 'express';
import { UpdateRevenueUseCase } from './update-revenue-use-case';
import { container } from 'tsyringe';

export class UpdateRevenueController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: revenueId } = req.params;
    const { amount, description } = req.body;

    const updateRevenueUseCase = container.resolve(UpdateRevenueUseCase);

    const revenue = updateRevenueUseCase.execute({
      id: revenueId,
      amount,
      description,
    });

    return res.status(200).json(revenue);
  }
}
