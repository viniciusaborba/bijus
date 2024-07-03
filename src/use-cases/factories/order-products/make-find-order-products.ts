import { CreateOrderUseCase } from "@/use-cases/orders/create";
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { PrismaOrderProductsRepository } from "@/repositories/prisma/prisma-order-products.repository";
import { FindOrderProductUseCase } from "@/use-cases/order-products/find-order-product";

export function makeFindOrderProductUseCase() {
  const prismaOrdersRepository = new PrismaOrderProductsRepository();
  const useCase = new FindOrderProductUseCase(prismaOrdersRepository);

  return useCase;
}
