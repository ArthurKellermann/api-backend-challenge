import { CreateRevenueDto } from '../../dtos/create-revenue-dto';
import { Revenue } from '../../entities/revenue';
import { RevenueRepository } from '../revenue-repository';

export class InMemoryRevenueRepository implements RevenueRepository {
  private revenues: Revenue[] = [];

  async create({
    title,
    amount,
    description,
    user_id,
  }: CreateRevenueDto): Promise<Revenue> {
    const revenue = new Revenue();

    Object.assign(revenue, {
      title,
      amount,
      description,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.revenues.push(revenue);

    return revenue;
  }
}
