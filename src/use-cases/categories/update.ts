import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";
import { hash } from "bcryptjs";
import { CategoriesRepository } from "../../repositories/categories-repository";
import { formatToSlug } from "../../utils/format-to-slug";

interface UpdateCategoryRequest {
  categoryId: string;
  name?: string;
  imageUrl?: string;
}

type UpdateCategoryResponse = Either<NotFoundError, null>;

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    categoryId,
    name,
    imageUrl,
  }: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      return left(new NotFoundError("Category"));
    }

    if (name) {
      category.name = name ?? category.name;
      category.slug = formatToSlug(name) ?? category.slug;
    }

    category.imageUrl = imageUrl ?? category.imageUrl;

    await this.categoriesRepository.update(category, category.id);

    return right(null);
  }
}
