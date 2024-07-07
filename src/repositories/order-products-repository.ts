import { OrderProduct } from "@prisma/client";

export interface OrdersProductsRepository {
  findManyByOrderId(orderId: string): Promise<OrderProduct[]>;
}
