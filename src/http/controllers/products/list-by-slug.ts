import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeListProductsBySlugUseCase } from "../../../use-cases/factories/products/make-list-by-slug-use-case";
import { NotFoundError } from "../../../errors/not-found-error";

export async function listBySlug(req: FastifyRequest, res: FastifyReply) {
  const ListBySlugBodySchema = z.object({
    slug: z.string(),
  });

  const { slug } = ListBySlugBodySchema.parse(req.params);

  const ListBySlugUseCase = makeListProductsBySlugUseCase();

  const result = await ListBySlugUseCase.execute({
    slug,
  });

  if (result.isLeft()) {
    throw new NotFoundError("Slug");
  }

  const products = result.value.products;

  return res.status(200).send({ products });
}
