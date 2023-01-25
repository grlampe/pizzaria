import { randomUUID } from 'crypto';
import { Address } from './address';

describe('Address', () => {
  it('should be able to create a new Address', () => {
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

    expect(address).toBeTruthy();
    expect(address.street).toEqual('Street example');
    expect(address.city).toEqual('City example');
    expect(address.complement).toEqual('Complement example');
    expect(address.country).toEqual('Country example');
    expect(address.number).toEqual(999);
    expect(address.state).toEqual('State example');
    expect(address.zipCode).toEqual('00000-000');
    expect(address.createdAt).toEqual(expect.any(Date));
    expect(address.userID).toEqual(expect.any(String));
  });
});
