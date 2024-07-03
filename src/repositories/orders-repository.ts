import { Prisma, Order, Product } from "@prisma/client";

export interface ProductProps {
  id: string;
}

export interface OrdersRepositoryProps {
  userId: string;
  products: ProductProps[];
}

export interface OrdersRepository {
  create({ userId, products }: OrdersRepositoryProps): Promise<Order>;
}
