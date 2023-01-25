import { User as RawUser } from '@prisma/client';
import { User } from '../../../modules/user/models/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      fullAddress: user.fullAddress,
      createdAt: user.createdAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        fullAddress: raw.fullAddress,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
