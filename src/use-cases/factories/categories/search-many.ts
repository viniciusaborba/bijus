import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../../repositories/categories-repository";
import { Either, left, right } from "../../../@types/either";
import { NotFoundError } from "../../../errors/not-found-error";

interface SearchManyCategoriesRequest {
  q: string;
  page: number;
}

type SearchManyCategoriesResponse = Either<
  NotFoundError,
  {
    categories: Category[];
  }
>;

export class SearchManyCategories {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    q,
    page,
  }: SearchManyCategoriesRequest): Promise<SearchManyCategoriesResponse> {
    const categories = await this.categoriesRepository.searchMany(q, page);

    if (!categories) {
      return left(new NotFoundError("Category"));
    }

    return right({
      categories,
    });
  }
}
