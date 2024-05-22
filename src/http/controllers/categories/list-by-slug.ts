import { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeListCategoriesUseCase } from "../../../use-cases/factories/categories/make-list-categories-use-case";
import { z } from "zod";
import { makeListBySlugUseCase } from "../../../use-cases/factories/categories/make-list-by-slug-use-case";

export async function listBySlug(req: FastifyRequest, res: FastifyReply) {
  const listBySlugQuerySchema = z.object({
    slug: z.string(),
  });

  const { slug } = listBySlugQuerySchema.parse(req.params);

  const listBySlugUseCase = makeListBySlugUseCase();

  const result = await listBySlugUseCase.execute({
    slug,
  });

  if (result.isLeft()) {
    throw new NotFoundError("Category");
  }

  const category = result.value.category;

  return res.status(200).send({ category });
}
