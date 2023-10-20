import { inject } from 'tsyringe';
import { RevenueRepository } from '../../repositories/revenue-repository';

export class ListRevenuesUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
  ) {}

  async execute() {
    const revenues = await this.revenueRepository.list();

    return revenues;
  }
}
