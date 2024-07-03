import {
  OrdersRepository,
  ProductProps,
} from "@/repositories/orders-repository";
import { Order } from "@prisma/client";

interface CreateOrderRequest {
  userId: string;
  products: ProductProps[];
}

interface CreateOrderResponse {
  order: Order;
}
export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    userId,
    products,
  }: CreateOrderRequest): Promise<CreateOrderResponse> {
    const order = await this.ordersRepository.create({
      userId,
      products,
    });

    return {
      order,
    };
  }
}
