import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListProductsBySlugUseCase } from "../../../use-cases/factories/products/make-list-by-slug-use-case";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeFindManyOffersUseCase } from "../../../use-cases/factories/products/make-find-many-offers";

export async function findManyOffers(req: FastifyRequest, res: FastifyReply) {
  const FindManyOffersUseCase = makeFindManyOffersUseCase();

  const result = await FindManyOffersUseCase.execute();

  if (result.isLeft()) {
    throw new NotFoundError("Products");
  }

  const offers = result.value.offers;

  return res.status(200).send({ offers });
}
