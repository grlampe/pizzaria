import { Address } from '../../src/modules/address/models/address';
import { AddressRepository } from '../../src/modules/address/repositories/address.repository';

export class InMemoryAddressRepository implements AddressRepository {
  public address: Address[] = [];

  async create(address: Address): Promise<void> {
    this.address.push(address);
  }
}
