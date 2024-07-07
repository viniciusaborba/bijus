import { Either, left, right } from "@/@types/either";
import { NotFoundError } from "@/errors/not-found-error";
import { OrdersProductsRepository } from "@/repositories/order-products-repository";
import { OrderProduct } from "@prisma/client";

interface FindOrderProductRequest {
  orderId: string;
}

type FindOrderProductResponse = Either<
  NotFoundError,
  {
    orderProducts: OrderProduct[];
  }
>;
export class FindOrderProductUseCase {
  constructor(private orderProductsRepository: OrdersProductsRepository) {}

  async execute({
    orderId,
  }: FindOrderProductRequest): Promise<FindOrderProductResponse> {
    const orderProducts = await this.orderProductsRepository.findManyByOrderId(orderId);

    if (!orderProducts) {
      return left(new NotFoundError("order products"));
    }

    return right({
      orderProducts,
    });
  }
}
