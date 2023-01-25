import { randomUUID } from 'crypto';
import { InMemoryOrderRepository } from '../../../../test/repositories/in-memory-orderRepository';
import { CreateOrderService } from './createOrder.service';

describe('Create Order Service', () => {
  it('should be able to create a Order', async () => {
    const orderRepository = InMemoryOrderRepository.getInstance();
    const createOrderService = new CreateOrderService(orderRepository);

    const { order } = await createOrderService.execute({
      userID: randomUUID(),
      addressID: randomUUID(),
    });

    expect(orderRepository.orders).toHaveLength(1);
    expect(orderRepository.orders[0]).toEqual(order);
  });
});
