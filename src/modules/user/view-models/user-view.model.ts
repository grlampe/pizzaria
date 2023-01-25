import { User } from '../models/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      fullAddress: user.fullAddress,
      createdAt: user.createdAt,
    };
  }
}
