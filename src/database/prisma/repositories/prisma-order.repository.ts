import { Injectable } from '@nestjs/common';
import { Order } from '../../../modules/orders/models/order.model';
import { OrderRepository } from '../../../modules/orders/repositories/order.repository';
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  async create(order: Order): Promise<void> {
    const raw = PrismaOrderMapper.toPrisma(order);

    await this.prismaService.order.create({
      data: raw,
    });
  }

  constructor(private prismaService: PrismaService) {}
  async findAllByUserID(userID: string): Promise<Order[]> {
    const result = await this.prismaService.order.findMany({
      where: { userID: userID },
    });

    return PrismaOrderMapper.toListDomain(result);
  }
}
