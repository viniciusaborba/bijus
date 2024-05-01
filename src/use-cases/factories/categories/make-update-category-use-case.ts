import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories-repository";
import { UpdateCategoryUseCase } from "../../categories/update";

export function makeUpdateCategoryUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const useCase = new UpdateCategoryUseCase(prismaCategoriesRepository);

  return useCase;
}
