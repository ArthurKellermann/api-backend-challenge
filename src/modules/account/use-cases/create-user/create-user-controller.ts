import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './create-user-use-case';
import { UserMapper } from '../../mappers/user-mapper';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, balance } = req.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      balance,
    });

    return res.status(201).json(UserMapper.toDomain(user));
  }
}
