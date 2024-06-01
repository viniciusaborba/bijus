import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeReadProductBySlugUseCase } from "../../../use-cases/factories/products/make-read-product-by-slug";

export async function read(req: FastifyRequest, res: FastifyReply) {
  const ReadProductBySlugBodySchema = z.object({
    slug: z.string(),
  });

  const { slug } = ReadProductBySlugBodySchema.parse(req.params);

  const ReadUseCase = makeReadProductBySlugUseCase();

  const result = await ReadUseCase.execute({
    slug,
  });

  if (result.isLeft()) {
    throw new NotFoundError("Slug");
  }

  const product = result.value.product;

  return res.status(200).send({ product });
}
