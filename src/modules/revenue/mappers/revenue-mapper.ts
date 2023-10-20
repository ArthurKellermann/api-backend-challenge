import { User } from '../../account/entities/user';
import { Revenue } from '../entities/revenue';

export class RevenueMapper {
  static toDomain(revenue: Revenue, user: User) {
    return {
      revenue: {
        id: revenue.id,
        title: revenue.title,
        amount: revenue.amount,
        description: revenue.description,
        updated_at: revenue.updated_at,
        created_at: revenue.created_at,
      },
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    };
  }
}
