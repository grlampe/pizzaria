import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';
import { OrderRepository } from '../repositories/order.repository';

interface ListAllOrdersByUserIDRequest {
  userID: string;
}

interface ListAllOrdersByUserIDResponse {
  orders: Order[];
}

@Injectable()
export class ListAllOrdersByUserIDService {
  constructor(private orderRepository: OrderRepository) {}

  async execute(
    request: ListAllOrdersByUserIDRequest,
  ): Promise<ListAllOrdersByUserIDResponse> {
    const { userID } = request;

    const orders = await this.orderRepository.findAllByUserID(userID);

    return {
      orders,
    };
  }
}
