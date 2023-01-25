import { User } from '../models/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
