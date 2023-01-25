import { Address } from '../models/address';

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>;
}
