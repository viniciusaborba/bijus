import { PrismaProductsRepository } from "../../../repositories/prisma/prisma-products-repository";
import { ReadProductUseCase } from "../../products/read";

export function makeReadProductBySlugUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const useCase = new ReadProductUseCase(prismaProductsRepository);

  return useCase;
}
