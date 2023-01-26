import { randomUUID } from 'crypto';
import { InMemoryAddressRepository } from '../../../../test/repositories/in-memory-addressRepository';
import { Address } from '../models/address';
import { CreateAddressService } from './createAddress.service';

describe('Create Address Service', () => {
  it('should be able to create a Address', async () => {
    const addressRepository = InMemoryAddressRepository.getInstance();
    const createAddressService = new CreateAddressService(addressRepository);

    const { address } = await createAddressService.execute({
      userID: randomUUID(),
      street: 'Street example',
      city: 'City example',
      complement: 'Complement example',
      country: 'Country example',
      number: 999,
      state: 'State example',
      zipCode: '00000-000',
    });

    expect(addressRepository.address).toHaveLength(1);
    expect(addressRepository.address[0]).toEqual(address);
  });

  it('should not be able to create a same Address', async () => {
    const addressRepository = InMemoryAddressRepository.getInstance();
    const createAddressService = new CreateAddressService(addressRepository);

    const address = new Address({
      userID: randomUUID(),
      street: 'Street example',
      city: 'City example',
      complement: 'Complement example',
      country: 'Country example',
      number: 999,
      state: 'State example',
      zipCode: '00000-000',
    });

    await addressRepository.create(address);

    expect(async () => {
      await createAddressService.execute({
        userID: address.userID,
        street: address.street,
        city: address.city,
        complement: address.complement,
        country: address.country,
        number: address.number,
        state: address.state,
        zipCode: address.zipCode,
      });
    }).rejects.toThrowError('Address Already Exists!');
  });
});
