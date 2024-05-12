import { PrismaProductsRepository } from "../../../repositories/prisma/prisma-products-repository";
import { DeleteProductUseCase } from "../../products/delete";

export function makeDeleteProductUserUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const useCase = new DeleteProductUseCase(prismaProductsRepository);

  return useCase;
}
