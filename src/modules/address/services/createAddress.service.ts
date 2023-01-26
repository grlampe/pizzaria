import { BadRequestException, Injectable } from '@nestjs/common';
import { Address } from '../models/address';
import { AddressRepository } from '../repositories/address.repository';

interface CreateAddressRequest {
  userID: string;
  street: string;
  number: number;
  zipCode: string;
  complement: string;
  state: string;
  country: string;
  city: string;
}

interface CreateAddressResponse {
  address: Address;
}

@Injectable()
export class CreateAddressService {
  constructor(private addressRepository: AddressRepository) {}

  async execute(request: CreateAddressRequest): Promise<CreateAddressResponse> {
    const {
      userID,
      street,
      number,
      zipCode,
      complement,
      state,
      country,
      city,
    } = request;

    const findAddress = await this.addressRepository.findAddressByAllFields({
      userID,
      street,
      number,
      zipCode,
      complement,
      state,
      country,
      city,
    });

    if (findAddress) {
      throw new BadRequestException('Address Already Exists!');
    }

    const address = new Address({
      userID,
      street,
      number,
      zipCode,
      complement,
      state,
      country,
      city,
    });

    await this.addressRepository.create(address);

    return {
      address,
    };
  }
}
