import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories-repository";
import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";

interface ReadCategoryRequest {
  categoryId: string;
}

type ReadCategoryResponse = Either<
  NotFoundError,
  {
    category: Category;
  }
>;
export class ReadCategory {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    categoryId,
  }: ReadCategoryRequest): Promise<ReadCategoryResponse> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      return left(new NotFoundError("Category"));
    }

    return right({
      category,
    });
  }
}
