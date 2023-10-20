import { inject, injectable } from 'tsyringe';
import { RevenueRepository } from '../../repositories/revenue-repository';
import { UsersRepository } from '../../../account/repositories/users-repository';

interface CreateRevenueRequest {
  title: string;
  amount: number;
  description: string;
  user_id: string;
}

@injectable()
export class CreateRevenueUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ amount, description, title, user_id }: CreateRevenueRequest) {
    const revenue = await this.revenueRepository.create({
      amount,
      description,
      title,
      user_id,
    });

    const user = await this.usersRepository.findById(user_id);

    return { revenue, user };
  }
}
