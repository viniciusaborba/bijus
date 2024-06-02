import { PrismaProductsRepository } from "../../../repositories/prisma/prisma-products-repository";
import { FindManyOffersUseCase } from "../../products/find-many-offers";

export function makeFindManyOffersUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const useCase = new FindManyOffersUseCase(prismaProductsRepository);

  return useCase;
}
