import { PrismaProductsRepository } from "../../../repositories/prisma/prisma-products-repository";
import { CreateProductUseCase } from "../../products/create";

export function makeCreateProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const useCase = new CreateProductUseCase(prismaProductsRepository);

  return useCase;
}
