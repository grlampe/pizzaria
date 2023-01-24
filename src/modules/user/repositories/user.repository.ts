import { User } from '../models/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
}
