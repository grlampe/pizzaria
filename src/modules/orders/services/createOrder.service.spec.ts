import { randomUUID } from 'crypto';
import { InMemoryAddressRepository } from '../../../../test/repositories/in-memory-addressRepository';
import { InMemoryOrderRepository } from '../../../../test/repositories/in-memory-orderRepository';
import { Address } from '../../address/models/address';
import { CreateOrderService } from './createOrder.service';

describe('Create Order Service', () => {
  it('should be able to create a Order', async () => {
    const orderRepository = InMemoryOrderRepository.getInstance();
    const addressRepository = InMemoryAddressRepository.getInstance();
    const createOrderService = new CreateOrderService(
      orderRepository,
      addressRepository,
    );

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

    const { order } = await createOrderService.execute({
      userID: randomUUID(),
      addressID: address.id,
    });

    expect(orderRepository.orders).toHaveLength(1);
    expect(orderRepository.orders[0]).toEqual(order);
  });

  it('should not be able to create a Order without a ValidAddressID', async () => {
    const orderRepository = InMemoryOrderRepository.getInstance();
    const addressRepository = InMemoryAddressRepository.getInstance();
    const createOrderService = new CreateOrderService(
      orderRepository,
      addressRepository,
    );

    expect(
      async () =>
        await createOrderService.execute({
          userID: randomUUID(),
          addressID: randomUUID(),
        }),
    ).rejects.toThrowError('Address not found');
  });
});
