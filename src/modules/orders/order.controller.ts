import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderBody } from './dto/createOrderBody';
import { CreateOrderService } from './services/createOrder.service';
import { ListAllOrdersByUserIDService } from './services/listAllOrdersByUserIDService.service';
import { OrderViewModel } from './view-models/order-view.model';

@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly listAllOrdersByUserIDService: ListAllOrdersByUserIDService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateOrderBody, @Req() req) {
    const { addressID } = body;
    const { userID } = req.user;

    const { order } = await this.createOrderService.execute({
      userID,
      addressID,
    });

    return {
      order: OrderViewModel.toHTTP(order),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUserID(@Req() req) {
    const { userID } = req.user;

    const { orders } = await this.listAllOrdersByUserIDService.execute(userID);

    return {
      ordersList: OrderViewModel.toListHTTP(orders),
    };
  }
}
