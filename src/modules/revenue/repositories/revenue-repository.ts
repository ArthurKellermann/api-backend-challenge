import { CreateRevenueDto } from '../dtos/create-revenue-dto';
import { Revenue } from '../entities/revenue';

export interface RevenueRepository {
  create(data: CreateRevenueDto): Promise<Revenue>;
}
