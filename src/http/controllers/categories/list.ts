import { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeListCategoriesUseCase } from "../../../use-cases/factories/categories/make-list-categories-use-case";

export async function list(req: FastifyRequest, res: FastifyReply) {
  const listUseCase = makeListCategoriesUseCase();

  const result = await listUseCase.execute();

  if (result.isLeft()) {
    throw new NotFoundError("Categories");
  }

  const categories = result.value.categories;

  return res.status(200).send({ categories });
}
