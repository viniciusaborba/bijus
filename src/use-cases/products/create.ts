import { Product } from "@prisma/client";
import { Either, left, right } from "../../@types/either";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { ProductsRepository } from "../../repositories/products-repository";
import { formatToSlug } from "../../utils/format-to-slug";

interface CreateProductRequest {
  name: string;
  description: string;
  basePrice: number;
  imageUrls: string[];
  categoryId: string;
  discountPercentage?: number;
}

type CreateProductResponse = Either<
  AlreadyExistsError,
  {
    product: Product;
  }
>;

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    basePrice,
    categoryId,
    description,
    discountPercentage,
    imageUrls,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) {
      return left(new AlreadyExistsError("Product"));
    }

    const product = await this.productsRepository.create({
      name,
      slug: formatToSlug(name),
      imageUrls,
      basePrice,
      discountPercentage,
      categoryId,
      description,
    });

    return right({
      product,
    });
  }
}
