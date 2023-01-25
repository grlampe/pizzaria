import * as client from '@prisma/client';
import { Order } from '../../../modules/orders/models/order.model';

export class PrismaOrderMapper {
  static toPrisma(order: Order) {
    return {
      id: order.id,
      userID: order.userID,
      addressID: order.addressID,
      createdAt: order.createdAt,
    };
  }

  static toDomain(raw: client.Order): Order {
    return new Order(
      {
        userID: raw.userID,
        addressID: raw.addressID,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }

  static toListDomain(rawList: client.Order[]) {
    return rawList.map((o) => PrismaOrderMapper.toDomain(o));
  }
}
