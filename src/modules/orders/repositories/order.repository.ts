import { Order } from '../models/order.model';

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>;

  abstract findAllByUserID(userID: string): Promise<Order[] | null>;
}
