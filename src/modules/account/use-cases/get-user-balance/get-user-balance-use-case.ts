import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../repositories/users-repository';
import { RevenueRepository } from '../../../revenue/repositories/revenue-repository';
import { User } from '../../entities/user';
import { AppError } from '../../../../shared/infra/errors/app-error';

interface GetUserBalanceRequest {
  id: string;
}

@injectable()
export class GetUserBalanceUseCase {
  constructor(
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
  ) {}

  async execute({ id }: GetUserBalanceRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    return user;
  }
}
