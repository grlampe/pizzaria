import { randomUUID } from 'crypto';
import { InMemoryAddressRepository } from '../../../../test/repositories/in-memory-addressRepository';
import { Address } from '../models/address';
import { ListAllAddressByUserIDService } from './listAllAddressByUserID.service';

describe('ListAllAddressByUserIDService', () => {
  it('should be able to List All Address using UserID', async () => {
    const addressRepository = InMemoryAddressRepository.getInstance();
    const listAllAddressByUserIDService = new ListAllAddressByUserIDService(
      addressRepository,
    );

    const newAddress = new Address({
      userID: randomUUID(),
      street: 'Street example',
      city: 'City example',
      complement: 'Complement example',
      country: 'Country example',
      number: 999,
      state: 'State example',
      zipCode: '00000-000',
      createdAt: new Date(),
    });

    await addressRepository.create(newAddress);

    const { address } = await listAllAddressByUserIDService.execute({
      userID: newAddress.userID,
    });

    expect(address).toHaveLength(1);
    expect(address[0]).toEqual(newAddress);
  });
});
