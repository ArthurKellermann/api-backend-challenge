import { inject, injectable } from 'tsyringe';
import { RevenueRepository } from '../../repositories/revenue-repository';
import { UsersRepository } from '../../../account/repositories/users-repository';

interface DeleteRevenueRequest {
  revenue_id: string;
  user_id: string;
}

@injectable()
export class DeleteRevenueUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    revenue_id,
    user_id,
  }: DeleteRevenueRequest): Promise<number> {
    const user = await this.usersRepository.findById(user_id);
    const revenue = await this.revenueRepository.findById(revenue_id);

    user.balance -= revenue.amount;

    await this.usersRepository.updateBalance({
      balance: user.balance,
      id: user.id,
    });

    await this.revenueRepository.deleteById(revenue_id);

    return user.balance;
  }
}
