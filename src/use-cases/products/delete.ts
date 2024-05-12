import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";
import { ProductsRepository } from "../../repositories/products-repository";

interface DeleteProductRequest {
  productId: string;
}

type DeleteProductResponse = Either<NotFoundError, null>;
export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: DeleteProductRequest): Promise<DeleteProductResponse> {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      return left(new NotFoundError("Product"));
    }

    await this.productsRepository.delete(product.id);

    return right(null);
  }
}
