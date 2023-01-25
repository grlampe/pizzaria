import { Address as RawAddress } from '@prisma/client';
import { Address } from '../../../modules/Address/models/address';

export class PrismaAddressMapper {
  static toPrisma(address: Address) {
    return {
      id: address.id,
      userID: address.userID,
      street: address.street,
      number: address.number,
      zipCode: address.zipCode,
      complement: address.complement,
      state: address.state,
      country: address.country,
      city: address.city,
      createdAt: address.createdAt,
    };
  }

  static toDomain(raw: RawAddress): Address {
    return new Address(
      {
        userID: raw.userID,
        street: raw.street,
        number: raw.number,
        zipCode: raw.zipCode,
        complement: raw.complement,
        state: raw.state,
        country: raw.country,
        city: raw.city,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
