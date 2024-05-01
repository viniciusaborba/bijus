import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories-repository";
import { UnregisterCategoryUseCase } from "../../categories/unregister";
import { SearchManyCategories } from "./search-many";

export function makeSearchManyCategoriesUserUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const useCase = new SearchManyCategories(prismaCategoriesRepository);

  return useCase;
}
