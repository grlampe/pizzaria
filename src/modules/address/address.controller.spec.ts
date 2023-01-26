import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryAddressRepository } from '../../../test/repositories/in-memory-addressRepository';
import { InMemoryUserRepository } from '../../../test/repositories/in-memory-userRepository';
import { User } from '../user/models/user';
import { UserRepository } from '../user/repositories/user.repository';
import { AddressController } from './adress.controller';
import { Address } from './models/address';
import { AddressRepository } from './repositories/address.repository';
import { CreateAddressService } from './services/createAddress.service';
import { ListAllAddressByUserIDService } from './services/listAllAddressByUserID.service';

describe('AddressController', () => {
  let addressController: AddressController;
  const repository: InMemoryAddressRepository =
    InMemoryAddressRepository.getInstance();
  const userRepository: InMemoryUserRepository =
    InMemoryUserRepository.getInstance();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AddressController],
      providers: [
        CreateAddressService,
        ListAllAddressByUserIDService,
        {
          provide: AddressRepository,
          useValue: repository,
        },
        {
          provide: UserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    addressController = app.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(addressController).toBeDefined();
  });

  it('should be to create a Address', async () => {
    const user = new User({
      name: 'User Name',
      email: 'user@example.com',
      password: 'test pass',
    });

    await userRepository.create(user);

    const { address } = await addressController.create(
      {
        street: 'Street example',
        city: 'City example',
        complement: 'Complement example',
        country: 'Country example',
        number: 999,
        state: 'State example',
        zipCode: '00000-000',
      },
      {
        user: {
          userID: user.id,
          email: user.email,
        },
      },
    );

    expect(address).toBeTruthy();
    expect(address.id).toEqual(expect.any(String));
    expect(address.street).toEqual('Street example');
    expect(address.city).toEqual('City example');
    expect(address.complement).toEqual('Complement example');
    expect(address.country).toEqual('Country example');
    expect(address.number).toEqual(999);
    expect(address.state).toEqual('State example');
    expect(address.zipCode).toEqual('00000-000');
    expect(address.createdAt).toEqual(expect.any(Date));
  });

  it('should be to return a list from Address using UserID', async () => {
    const user = new User({
      name: 'User Name',
      email: 'user@example.com',
      password: 'test pass',
    });

    await userRepository.create(user);

    const newAddress = new Address({
      userID: user.id,
      street: 'Street example',
      city: 'City example',
      complement: 'Complement example',
      country: 'Country example',
      number: 999,
      state: 'State example',
      zipCode: '00000-000',
    });

    await repository.create(newAddress);

    const { addressList } = await addressController.findAllByUserID({
      user: {
        userID: user.id,
        email: user.email,
      },
    });

    expect(addressList).toBeTruthy();
    expect(addressList[0][0].id).toEqual(expect.any(String));
    expect(addressList[0][0].street).toEqual('Street example');
    expect(addressList[0][0].city).toEqual('City example');
    expect(addressList[0][0].complement).toEqual('Complement example');
    expect(addressList[0][0].country).toEqual('Country example');
    expect(addressList[0][0].number).toEqual(999);
    expect(addressList[0][0].state).toEqual('State example');
    expect(addressList[0][0].zipCode).toEqual('00000-000');
    expect(addressList[0][0].createdAt).toEqual(expect.any(Date));
  });
});
