import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderCreateDto } from './dtos/order.dto';
import { User, UserProp } from 'src/util/user.decorators';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get('')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Post()
  createOrder(@Body() orderDto: OrderCreateDto, @User() user: UserProp) {
    return this.orderService.createOrder({
      ...orderDto,
      userId: user.id,
    });
  }
}
