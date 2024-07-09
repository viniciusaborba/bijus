import { Order } from "@prisma/client";

export interface ProductProps {
  productId: string;
  quantity?: number;
}

export interface OrdersRepositoryProps {
  userId: string;
  products: ProductProps[];
}

export interface OrdersRepository {
  create({ userId, products }: OrdersRepositoryProps): Promise<Order>;
}
