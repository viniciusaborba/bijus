import { Product } from "@prisma/client";
import { Either, left, right } from "../../@types/either";
import { ProductsRepository } from "../../repositories/products-repository";
import { NotFoundError } from "../../errors/not-found-error";

interface ListProductsBySlugRequest {
  slug: string;
}

type ListProductsBySlugResponse = Either<
  NotFoundError,
  {
    products: Product[];
  }
>;

export class ListProductsBySlugUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    slug,
  }: ListProductsBySlugRequest): Promise<ListProductsBySlugResponse> {
    const products = await this.productsRepository.listProductsBySlug(slug);

    if (!products) {
      return left(new NotFoundError("Slug"));
    }

    return right({
      products,
    });
  }
}
