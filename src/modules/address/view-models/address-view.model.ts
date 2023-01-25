import { Address } from '../models/address';

export class AddressViewModel {
  static toHTTP(address: Address) {
    return {
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
}
