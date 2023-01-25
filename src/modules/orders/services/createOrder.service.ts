import { Injectable } from '@nestjs/common';
import { Order } from '../models/order.model';
import { OrderRepository } from '../repositories/order.repository';

interface CreateOrderRequest {
  userID: string;
  addressID: string;
}

interface CreateAddressResponse {
  order: Order;
}

@Injectable()
export class CreateOrderService {
  constructor(private orderRepository: OrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<CreateAddressResponse> {
    const { userID, addressID } = request;

    const order = new Order({
      userID,
      addressID,
    });

    await this.orderRepository.create(order);

    return {
      order,
    };
  }
}
