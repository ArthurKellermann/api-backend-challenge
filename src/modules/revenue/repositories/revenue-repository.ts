import { CreateRevenueDto } from '../dtos/create-revenue-dto';
import { UpdateRevenueDto } from '../dtos/update-revenue-dto';
import { Revenue } from '../entities/revenue';

export interface RevenueRepository {
  create(data: CreateRevenueDto): Promise<Revenue>;
  deleteById(id: string): Promise<void>;
  list(): Promise<Revenue[]>;
  udpateById(data: UpdateRevenueDto): Promise<Revenue>;
  findById(id: string): Promise<Revenue>;
  getTotalRevenueAmount(): Promise<number>;
}
