import { inject } from 'tsyringe';
import { RevenueRepository } from '../../repositories/revenue-repository';
import { UsersRepository } from '../../../account/repositories/users-repository';

interface CreateRevenueRequest {
  title: string;
  amount: number;
  description: string;
  user_id: string;
}

export class CreateRevenueUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private revenueRepository: RevenueRepository,
    @inject('PrismaUsersRepository')
    private usersRepository: UsersRepository,
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
