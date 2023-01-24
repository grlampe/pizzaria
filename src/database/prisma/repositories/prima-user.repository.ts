import { Injectable } from '@nestjs/common';
import { User } from '../../../modules/user/models/user';
import { UserRepository } from '../../../modules/user/repositories/user.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        fullAddress: user.fullAddress,
        createdAt: user.createdAt,
      },
    });
  }
}
