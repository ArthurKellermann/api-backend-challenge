import { CreateRevenueDto } from '../dtos/create-revenue-dto';
import { UpdateRevenueDto } from '../dtos/update-revenue-dto';
import { Revenue } from '../entities/revenue';

export interface RevenueRepository {
  create(data: CreateRevenueDto): Promise<Revenue>;
  deleteById(id: string): Promise<void>;
  list(user_id): Promise<Revenue[]>;
  updateById(data: UpdateRevenueDto): Promise<Revenue>;
  findById(id: string): Promise<Revenue>;
  getTotalRevenueAmount(user_id: string): Promise<number>;
}
