import { inject, injectable } from 'tsyringe';
import { RevenueRepository } from '../../repositories/revenue-repository';
import { UsersRepository } from '../../../account/repositories/users-repository';

interface UpdateRevenueRequest {
  id: string;
  amount?: number;
  description?: string;
}

@injectable()
export class UpdateRevenueUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ id, amount, description }: UpdateRevenueRequest) {
    const revenue = await this.revenueRepository.findById(id);

    if (!revenue) {
      throw new Error('Revenue does not exists');
    }

    const user = await this.usersRepository.findById(revenue.user_id);

    const difference = amount - revenue.amount;

    user.balance += difference;

    await this.usersRepository.updateBalance({
      id: user.id,
      balance: user.balance,
    });

    const updatedRevenue = await this.revenueRepository.updateById({
      id,
      amount,
      description,
    });

    return updatedRevenue;
  }
}
