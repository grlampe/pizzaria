import { User } from '../../src/modules/user/models/user';
import { UserRepository } from '../../src/modules/user/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  private static INSTANTE: InMemoryUserRepository;

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  public static getInstance(): InMemoryUserRepository {
    if (!InMemoryUserRepository.INSTANTE) {
      return new InMemoryUserRepository();
    }

    return InMemoryUserRepository.INSTANTE;
  }
}
