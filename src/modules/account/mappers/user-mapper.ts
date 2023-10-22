import { User } from '../../account/entities/user';

export class UserMapper {
  static toDomain(user: User) {
    return {
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
        update_at: user.updated_at,
      },
    };
  }
}
