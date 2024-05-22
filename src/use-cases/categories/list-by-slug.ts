import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/categories-repository";
import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";

interface ListBySlugRequest {
  slug: string;
}

type ListBySlugResponse = Either<
  NotFoundError,
  {
    category: Category;
  }
>;
export class ListBySlugUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ slug }: ListBySlugRequest): Promise<ListBySlugResponse> {
    const category = await this.categoriesRepository.listBySlug(slug);

    if (!category) {
      return left(new NotFoundError("Categories"));
    }

    return right({
      category,
    });
  }
}
