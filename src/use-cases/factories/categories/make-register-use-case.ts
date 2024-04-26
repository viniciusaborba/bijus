import { PrismaCategoriesRepository } from "../../../repositories/prisma/prisma-categories-repository";
import { RegisterCategory } from "../../categories/register";

export function makeRegisterCategoryUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const useCase = new RegisterCategory(prismaCategoriesRepository);

  return useCase;
}
