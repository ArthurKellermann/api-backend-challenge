import { inject, injectable } from 'tsyringe';
import { RevenueRepository } from '../../repositories/revenue-repository';
import { Revenue } from '../../entities/revenue';
import { DateProvider } from '../../../../shared/container/providers/date-provider/date-provider';

@injectable()
export class ListRevenuesUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: DateProvider,
  ) {}

  async execute(): Promise<Revenue[]> {
    const revenues = await this.revenueRepository.list();

    return revenues.sort((a, b) => {
      return this.dateProvider.compareDate(a.created_at, b.created_at);
    });
  }
}
