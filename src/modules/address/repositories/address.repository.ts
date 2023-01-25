import { Address } from '../models/address';

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>;

  abstract findAllByUserID(userID: string): Promise<Address[] | null>;
}
