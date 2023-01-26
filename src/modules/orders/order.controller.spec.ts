import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryAddressRepository } from '../../../test/repositories/in-memory-addressRepository';
import { InMemoryOrderRepository } from '../../../test/repositories/in-memory-orderRepository';
import { InMemoryUserRepository } from '../../../test/repositories/in-memory-userRepository';
import { Address } from '../address/models/address';
import { AddressRepository } from '../address/repositories/address.repository';
import { User } from '../user/models/user';
import { UserRepository } from '../user/repositories/user.repository';
import { Order } from './models/order.model';
import { OrderController } from './order.controller';
import { OrderRepository } from './repositories/order.repository';
import { CreateOrderService } from './services/createOrder.service';
import { ListAllOrdersByUserIDService } from './services/listAllOrdersByUserIDService.service';

describe('OrderController', () => {
  let orderController: OrderController;
  const repository: InMemoryOrderRepository =
    InMemoryOrderRepository.getInstance();
  const userRepository: InMemoryUserRepository =
    InMemoryUserRepository.getInstance();
  const addressRepository: InMemoryAddressRepository =
    InMemoryAddressRepository.getInstance();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [OrderController],
      providers: [
        CreateOrderService,
        ListAllOrdersByUserIDService,
        {
          provide: OrderRepository,
          useValue: repository,
        },
        {
          provide: AddressRepository,
          useValue: addressRepository,
        },
        {
          provide: UserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  it('should be able to create a new Order', async () => {
    const user = new User({
      name: 'User Name',
      email: 'user@example.com',
      password: 'test pass',
    });

    await userRepository.create(user);

    const address = new Address({
      userID: user.id,
      street: 'Street example',
      city: 'City example',
      complement: 'Complement example',
      country: 'Country example',
      number: 999,
      state: 'State example',
      zipCode: '00000-000',
    });

    await addressRepository.create(address);

    const { order } = await orderController.create(
      {
        addressID: address.id,
      },
      {
        user: {
          userID: user.id,
          email: user.email,
        },
      },
    );

    expect(order).toBeTruthy();
    expect(order.id).toEqual(expect.any(String));
    expect(order.addressID).toEqual(address.id);
    expect(address.createdAt).toEqual(expect.any(Date));
  });

  it('should be to return a list from Orders using UserID', async () => {
    const user = new User({
      name: 'User Name',
      email: 'user@example.com',
      password: 'test pass',
    });

    await userRepository.create(user);

    const address = new Address({
      userID: user.id,
      street: 'Street example',
      city: 'City example',
      complement: 'Complement example',
      country: 'Country example',
      number: 999,
      state: 'State example',
      zipCode: '00000-000',
    });

    await addressRepository.create(address);

    const order = new Order({
      userID: user.id,
      addressID: address.id,
      createdAt: new Date(),
    });

    await repository.create(order);

    const { ordersList } = await orderController.findAllByUserID({
      user: {
        userID: user.id,
        email: user.email,
      },
    });

    expect(ordersList).toBeTruthy();
    expect(ordersList[0][0].id).toEqual(expect.any(String));
    expect(ordersList[0][0].addressID).toEqual(address.id);
    expect(ordersList[0][0].createdAt).toEqual(expect.any(Date));
  });
});
