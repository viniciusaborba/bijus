import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories-repository";
import { UnregisterCategoryUseCase } from "../../categories/unregister";

export function makeUnregisterCategoryUserUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const useCase = new UnregisterCategoryUseCase(prismaCategoriesRepository);

  return useCase;
}
