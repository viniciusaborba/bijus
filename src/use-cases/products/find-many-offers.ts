import { Product } from "@prisma/client";
import { Either, left, right } from "../../@types/either";
import { ProductsRepository } from "../../repositories/products-repository";
import { NotFoundError } from "../../errors/not-found-error";

type FindManyOffersResponse = Either<
  NotFoundError,
  {
    offers: Product[];
  }
>;

export class FindManyOffersUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<FindManyOffersResponse> {
    const offers = await this.productsRepository.findManyOffers();

    if (!offers) {
      return left(new NotFoundError("Products"));
    }

    return right({
      offers,
    });
  }
}
