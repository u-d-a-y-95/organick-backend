import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { OrderCreateDto } from './dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(private dbService: DbService) {}

  async getAllOrders() {
    return this.dbService.order.findMany({});
  }

  async createOrder(body: OrderCreateDto): Promise<any> {
    return this.dbService.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: body.userId,
          addressId: body.addressId,
        },
      });
      await tx.orderDetails.createMany({
        data: [
          ...body.products.map((product) => ({
            orderId: order.id,
            productId: product.id,
            quantity: product.quantity,
            price: product.price,
          })),
        ],
      });
      const payment = await tx.payment.create({
        data: {
          orderId: order.id,
          amount: body.products.reduce((acc, item) => acc + item.price, 0),
        },
      });
      return {
        orderId: order.id,
        amount: payment.amount,
        paymentStatus: order.paymentStatus,
        status: order.status,
      };
    });
  }
}
