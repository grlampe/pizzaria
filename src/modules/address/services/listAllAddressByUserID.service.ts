import { Injectable } from '@nestjs/common';
import { Address } from '../models/address';
import { AddressRepository } from '../repositories/address.repository';

interface ListAllAddressByUserIDRequest {
  userID: string;
}

interface ListAllAddressByUserIDResponse {
  address: Address[];
}

@Injectable()
export class ListAllAddressByUserIDService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(
    request: ListAllAddressByUserIDRequest,
  ): Promise<ListAllAddressByUserIDResponse> {
    const { userID } = request;

    const address = await this.addressRepository.findAllByUserID(userID);

    return {
      address,
    };
  }
}
