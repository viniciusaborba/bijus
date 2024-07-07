import { prisma } from "../../lib/prisma";
import { OrdersProductsRepository } from "../order-products-repository";

export class PrismaOrderProductsRepository implements OrdersProductsRepository {
  async findManyByOrderId(orderId: string) {
    const orderProducts = await prisma.orderProduct.findMany({
      where: {
        orderId
      },
    });

    return orderProducts;
  }
}
