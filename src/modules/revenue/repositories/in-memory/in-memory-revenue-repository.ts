import { CreateRevenueDto } from '../../dtos/create-revenue-dto';
import { Revenue } from '../../entities/revenue';
import { RevenueRepository } from '../revenue-repository';

export class InMemoryRevenueRepository implements RevenueRepository {
  private revenues: Revenue[] = [];

  async create({
    id,
    title,
    amount,
    description,
    user_id,
    created_at,
    updated_at,
  }: CreateRevenueDto): Promise<Revenue> {
    const revenue = new Revenue();

    Object.assign(revenue, {
      id,
      title,
      amount,
      description,
      user_id,
      created_at,
      updated_at,
    });

    return revenue;
  }
}
