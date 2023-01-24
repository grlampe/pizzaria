import { User } from '../../src/modules/user/models/user';
import { UserRepository } from '../../src/modules/user/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
