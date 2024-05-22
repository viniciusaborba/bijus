import { Product } from "@prisma/client";
import { Either, left, right } from "../../@types/either";
import { ProductsRepository } from "../../repositories/products-repository";
import { NotFoundError } from "../../errors/not-found-error";

type ListProductsBySlugResponse = Either<
  NotFoundError,
  {
    necklaces: Product[];
  }
>;

export class ListProductsBySlugUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<ListProductsBySlugResponse> {
    const necklaces = await this.productsRepository.listProductsBySlug();

    if (!necklaces) {
      return left(new NotFoundError("Slug"));
    }

    return right({
      necklaces,
    });
  }
}
