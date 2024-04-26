import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories-repository";
import { Either, left, right } from "../../@types/either";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { formatToSlug } from "../../utils/format-to-slug";

interface RegisterCategoryRequest {
  name: string;
  slug?: string;
  imageUrl: string;
}

type RegisterCategoryResponse = Either<
  AlreadyExistsError,
  {
    category: Category;
  }
>;
export class RegisterCategory {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    name,
    slug,
    imageUrl,
  }: RegisterCategoryRequest): Promise<RegisterCategoryResponse> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      return left(new AlreadyExistsError("Category"));
    }

    const category = await this.categoriesRepository.create({
      name,
      slug: formatToSlug(name),
      imageUrl,
    });

    return right({
      category,
    });
  }
}
