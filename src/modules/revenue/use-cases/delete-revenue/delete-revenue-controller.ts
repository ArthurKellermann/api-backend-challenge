import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteRevenueUseCase } from './delete-revenue-use-case';

export class DeleteRevenueController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: user_id } = req.user;

    const deleteRevenueUseCase = container.resolve(DeleteRevenueUseCase);

    const balance = await deleteRevenueUseCase.execute({
      revenue_id: id,
      user_id,
    });

    return res.status(200).json({
      message: 'Revenue successfully deleted',
      current_balance: balance,
    });
  }
}
