import { OrderProduct } from "@prisma/client";

export interface OrdersProductsRepository {
  find(orderId: string): Promise<OrderProduct[]>;
}
