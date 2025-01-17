import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories-repository";
import { SearchManyCategories } from "../../categories/search-many";

export function makeSearchManyCategoriesUserUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const useCase = new SearchManyCategories(prismaCategoriesRepository);

  return useCase;
}
