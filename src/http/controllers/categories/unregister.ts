import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeUnregisterCategoryUserUseCase } from "../../../use-cases/factories/categories/make-unregister-category";

export async function unregister(req: FastifyRequest, res: FastifyReply) {
  const unregisterCategoryParamsSchema = z.object({
    categoryId: z.string(),
  });

  const { categoryId } = unregisterCategoryParamsSchema.parse(req.params);

  const unregisterUseCase = makeUnregisterCategoryUserUseCase();

  const result = await unregisterUseCase.execute({
    categoryId,
  });

  if (result.isLeft()) {
    throw new NotFoundError("Category");
  }

  return res.status(204).send();
}
