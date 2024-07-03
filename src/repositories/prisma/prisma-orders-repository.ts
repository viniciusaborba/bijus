import { OrdersRepository, OrdersRepositoryProps } from "../orders-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrdersRepository implements OrdersRepository {
  async create({ userId, products }: OrdersRepositoryProps) {
    const order = await prisma.order.create({
      data: {
        userId,
        status: "WAITING_FOR_PAYMENT",
        orderProducts: {
          createMany: {
            data: products.map((product) => ({
              productId: product.productId,
            })),
          },
        },
      },
    });

    return order;
  }
}
