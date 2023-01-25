import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { OrderController } from './order.controller';
import { CreateOrderService } from './services/createOrder.service';
import { ListAllOrdersByUserIDService } from './services/listAllOrdersByUserIDService.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [CreateOrderService, ListAllOrdersByUserIDService],
})
export class OrderModule {}
