import { inject, injectable } from 'tsyringe';
import { RevenueRepository } from '../../repositories/revenue-repository';

@injectable()
export class DeleteRevenueUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.revenueRepository.deleteById(id);
  }
}
