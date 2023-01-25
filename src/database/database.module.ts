import { Module } from '@nestjs/common';
import { AddressRepository } from '../modules/address/repositories/address.repository';
import { UserRepository } from '../modules/user/repositories/user.repository';
import { PrismaUserMapper } from './prisma/mappers/prisma-user-mapper';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

@Module({
  providers: [
    PrismaService,
    PrismaUserMapper,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AddressRepository,
      useClass: PrismaAddressRepository,
    },
  ],
  exports: [UserRepository, AddressRepository],
})
export class DatabaseModule {}
