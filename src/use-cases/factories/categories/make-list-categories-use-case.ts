import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories-repository";
import { ListCategories } from "../../categories/list";

export function makeListCategoriesUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const useCase = new ListCategories(prismaCategoriesRepository);

  return useCase;
}
