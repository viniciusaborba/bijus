import { CreateOrderUseCase } from "@/use-cases/orders/create";
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";

export function makeCreateOrderUseCase() {
  const prismaOrdersRepository = new PrismaOrdersRepository();
  const useCase = new CreateOrderUseCase(prismaOrdersRepository);

  return useCase;
}
