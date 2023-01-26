import { OptionsFindAddressByAllFields } from '../dto/optionsFindAddressByAllFields';
import { Address } from '../models/address';

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>;

  abstract findAllByUserID(userID: string): Promise<Address[] | null>;

  abstract findAddressByAllFields(
    data: OptionsFindAddressByAllFields,
  ): Promise<Address | null>;
}
