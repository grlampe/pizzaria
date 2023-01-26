import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressRepository } from '../../address/repositories/address.repository';
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
  constructor(
    private orderRepository: OrderRepository,
    private addressRepository: AddressRepository,
  ) {}

  async execute(request: CreateOrderRequest): Promise<CreateAddressResponse> {
    const { userID, addressID } = request;

    const findAddress = await this.addressRepository.findByID(addressID);

    if (!findAddress) {
      throw new BadRequestException('Address not found');
    }

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
