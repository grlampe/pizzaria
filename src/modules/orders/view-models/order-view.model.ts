import { Order } from '../models/order.model';

export class OrderViewModel {
  static toHTTP(order: Order) {
    return {
      id: order.id,
      addressID: order.addressID,
      createdAt: order.createdAt,
    };
  }

  static toListHTTP(orders: Order[]) {
    return [orders.map((o) => OrderViewModel.toHTTP(o))];
  }
}
