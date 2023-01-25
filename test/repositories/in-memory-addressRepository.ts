import { Address } from '../../src/modules/address/models/address';
import { AddressRepository } from '../../src/modules/address/repositories/address.repository';

export class InMemoryAddressRepository implements AddressRepository {
  public address: Address[] = [];

  private static INSTANTE: InMemoryAddressRepository;

  async create(address: Address): Promise<void> {
    this.address.push(address);
  }

  public static getInstance(): InMemoryAddressRepository {
    if (!InMemoryAddressRepository.INSTANTE) {
      return new InMemoryAddressRepository();
    }

    return InMemoryAddressRepository.INSTANTE;
  }

  async findAllByUserID(userID: string): Promise<Address[]> {
    return this.address.filter((a) => a.userID === userID);
  }
}
