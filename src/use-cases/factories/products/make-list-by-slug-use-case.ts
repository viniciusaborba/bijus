import { PrismaProductsRepository } from "../../../repositories/prisma/prisma-products-repository";
import { ListProductsBySlugUseCase } from "../../products/list-products-by-slug";

export function makeListProductsBySlugUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const useCase = new ListProductsBySlugUseCase(prismaProductsRepository);

  return useCase;
}
