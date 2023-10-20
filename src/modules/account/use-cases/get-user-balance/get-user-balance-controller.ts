import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetUserBalanceUseCase } from './get-user-balance-use-case';

export class GetUserBalanceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getUserBalanceUseCase = container.resolve(GetUserBalanceUseCase);

    const user = await getUserBalanceUseCase.execute({ id });

    return res.status(201).json(user);
  }
}
