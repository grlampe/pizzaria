import { randomUUID } from 'crypto';
import { InMemoryOrderRepository } from '../../../../test/repositories/in-memory-orderRepository';
import { Order } from '../models/order.model';
import { ListAllOrdersByUserIDService } from './listAllOrdersByUserIDService.service';

describe('ListAllOrdersByUserIDService', () => {
  it('should be able to List All Orders using UserID', async () => {
    const orderRepository = InMemoryOrderRepository.getInstance();
    const listAllOrdersByUserIDService = new ListAllOrdersByUserIDService(
      orderRepository,
    );

    const newOrder = new Order({
      userID: randomUUID(),
      addressID: randomUUID(),
      createdAt: new Date(),
    });

    await orderRepository.create(newOrder);

    const { orders } = await listAllOrdersByUserIDService.execute({
      userID: newOrder.userID,
    });

    expect(orders).toHaveLength(1);
    expect(orders[0]).toEqual(newOrder);
  });
});
