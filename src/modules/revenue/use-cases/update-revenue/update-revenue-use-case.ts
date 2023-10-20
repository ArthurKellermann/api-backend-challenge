import { inject } from 'tsyringe';
import { RevenueRepository } from '../../repositories/revenue-repository';

interface UpdateRevenueRequest {
  id: string;
  amount?: number;
  description?: string;
}
export class UpdateRevenueUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
  ) {}

  async execute({ id, amount, description }: UpdateRevenueRequest) {
    const revenueExists = await this.revenueRepository.findById(id);

    if (!revenueExists) {
      throw new Error('Revenue does not exists');
    }

    const revenue = await this.revenueRepository.udpateById({
      id,
      amount,
      description,
    });

    return revenue;
  }
}
