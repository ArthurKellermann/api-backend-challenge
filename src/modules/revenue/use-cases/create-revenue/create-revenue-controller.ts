import { container } from 'tsyringe';
import { CreateRevenueUseCase } from './create-revenue-use-case.';
import { Request, Response } from 'express';
import { RevenueMapper } from '../../mappers/revenue-mapper';

export class CreateRevenueController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { amount, description, title } = req.body;
    const { id: user_id } = req.user;

    const createRevenueUseCase = container.resolve(CreateRevenueUseCase);

    const { revenue, user } = await createRevenueUseCase.execute({
      amount,
      description,
      title,
      user_id,
    });

    return res.status(201).json(RevenueMapper.toDomain(revenue, user));
  }
}
