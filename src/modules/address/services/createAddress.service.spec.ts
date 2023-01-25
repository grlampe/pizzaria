import { randomUUID } from 'crypto';
import { InMemoryAddressRepository } from '../../../../test/repositories/in-memory-addressRepository';
import { CreateAddressService } from './createAddress.service';

describe('Create Address Service', () => {
  it('should be able to create a Address', async () => {
    const addressRepository = new InMemoryAddressRepository();
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
});
