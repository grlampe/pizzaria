import { Injectable } from '@nestjs/common';
import { OptionsFindAddressByAllFields } from '../../../modules/address/dto/optionsFindAddressByAllFields';
import { Address } from '../../../modules/address/models/address';
import { AddressRepository } from '../../../modules/address/repositories/address.repository';
import { PrismaAddressMapper } from '../mappers/prisma-address-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prismaService: PrismaService) {}

  async create(address: Address): Promise<void> {
    const raw = PrismaAddressMapper.toPrisma(address);

    await this.prismaService.address.create({
      data: raw,
    });
  }

  async findAddressByAllFields(
    data: OptionsFindAddressByAllFields,
  ): Promise<Address | null> {
    const result = await this.prismaService.address.findFirst({
      where: {
        userID: data.userID,
        street: data.street,
        number: data.number,
        zipCode: data.zipCode,
        complement: data.complement,
        state: data.state,
        country: data.country,
        city: data.city,
      },
    });

    if (!result) {
      return null;
    }

    return PrismaAddressMapper.toDomain(result);
  }

  async findAllByUserID(userID: string): Promise<Address[]> {
    const result = await this.prismaService.address.findMany({
      where: { userID: userID },
    });

    return PrismaAddressMapper.toListDomain(result);
  }
}
