import { Order } from '../../src/modules/orders/models/order.model';
import { OrderRepository } from '../../src/modules/orders/repositories/order.repository';

export class InMemoryOrderRepository implements OrderRepository {
  public orders: Order[] = [];

  private static INSTANCE: InMemoryOrderRepository;

  async create(order: Order): Promise<void> {
    this.orders.push(order);
  }

  public static getInstance(): InMemoryOrderRepository {
    if (!InMemoryOrderRepository.INSTANCE) {
      return new InMemoryOrderRepository();
    }

    return InMemoryOrderRepository.INSTANCE;
  }

  async findAllByUserID(userID: string): Promise<Order[]> {
    return this.orders.filter((a) => a.userID === userID);
  }
}
