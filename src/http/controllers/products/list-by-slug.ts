import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AlreadyExistsError } from "../../../errors/already-exists-error";
import { makeListProductsBySlugUseCase } from "../../../use-cases/factories/products/make-list-by-slug-use-case";
import { NotFoundError } from "../../../errors/not-found-error";

export async function listBySlug(req: FastifyRequest, res: FastifyReply) {
//   const ListBySlugBodySchema = z.object({
//     slug: z.string(),
//   });

//   const { slug } = ListBySlugBodySchema.parse(req.query);

  const ListBySlugUseCase = makeListProductsBySlugUseCase();

  const result = await ListBySlugUseCase.execute();

  if (result.isLeft()) {
    throw new NotFoundError("Slug");
  }

  const necklaces = result.value.necklaces;

  return res.status(200).send({ necklaces });
}
