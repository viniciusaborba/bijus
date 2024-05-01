import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories-repository";
import { ReadCategory } from "../../categories/read";

export function makeReadCategoryUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const useCase = new ReadCategory(prismaCategoriesRepository);

  return useCase;
}
