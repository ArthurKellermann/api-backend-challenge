import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../repositories/users-repository';
import { RevenueRepository } from '../../../revenue/repositories/revenue-repository';
import { User } from '../../entities/user';

interface GetUserBalanceRequest {
  id: string;
}

interface GetUserBalanceResponse {
  user: User;
  revenue: number;
  balanceUpdated: number;
}

@injectable()
export class GetUserBalanceUseCase {
  constructor(
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
  ) {}

  async execute({
    id,
  }: GetUserBalanceRequest): Promise<GetUserBalanceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User does not exists');
    }
    const revenue = await this.revenueRepository.getTotalRevenueAmount();

    const balanceUpdated = await this.usersRepository.updateBalance({
      data: { expense, revenue },
      id,
    });

    return { user, revenue, balanceUpdated };
  }
}
