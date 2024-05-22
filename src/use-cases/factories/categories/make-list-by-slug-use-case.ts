import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories-repository";
import { ListBySlugUseCase } from "../../categories/list-by-slug";

export function makeListBySlugUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const useCase = new ListBySlugUseCase(prismaCategoriesRepository);

  return useCase;
}
