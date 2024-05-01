import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";
import { CategoriesRepository } from "../../repositories/categories-repository";

interface UnregisterCategoryRequest {
  categoryId: string;
}

type UnregisterCategoryResponse = Either<NotFoundError, null>;
export class UnregisterCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    categoryId,
  }: UnregisterCategoryRequest): Promise<UnregisterCategoryResponse> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      return left(new NotFoundError("Category"));
    }

    await this.categoriesRepository.delete(category.id);

    return right(null);
  }
}
