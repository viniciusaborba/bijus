import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories-repository";
import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";

type ListCategoriesResponse = Either<
  NotFoundError,
  {
    categories: Category[];
  }
>;
export class ListCategories {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<ListCategoriesResponse> {
    const categories = await this.categoriesRepository.list();

    if (!categories) {
      return left(new NotFoundError("Categories"));
    }

    return right({
      categories,
    });
  }
}
