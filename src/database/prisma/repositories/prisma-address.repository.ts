import { Injectable } from '@nestjs/common';
import { Address } from '../../../modules/address/models/address';
import { AddressRepository } from '../../../modules/address/repositories/address.repository';
import { PrismaAddressMapper } from '../mappers/prisma-address-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  async create(address: Address): Promise<void> {
    const raw = PrismaAddressMapper.toPrisma(address);

    await this.prismaService.address.create({
      data: raw,
    });
  }

  constructor(private prismaService: PrismaService) {}
  async findAllByUserID(userID: string): Promise<Address[]> {
    const result = await this.prismaService.address.findMany({
      where: { userID: userID },
    });

    return PrismaAddressMapper.toListDomain(result);
  }
}
