import { Module } from '@nestjs/common';
import { UserRepository } from '../modules/user/repositories/user.repository';
import { PrismaUserMapper } from './prisma/mappers/prisma-user-mapper';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

@Module({
  providers: [
    PrismaService,
    PrismaUserMapper,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
