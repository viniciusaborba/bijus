import { Product } from "@prisma/client";
import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";
import { ProductsRepository } from "../../repositories/products-repository";

interface ReadProductRequest {
  slug: string;
}

type ReadProductResponse = Either<
  NotFoundError,
  {
    product: Product;
  }
>;
export class ReadProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ slug }: ReadProductRequest): Promise<ReadProductResponse> {
    const product = await this.productsRepository.read(slug);

    if (!product) {
      return left(new NotFoundError("Product"));
    }

    return right({
      product,
    });
  }
}
