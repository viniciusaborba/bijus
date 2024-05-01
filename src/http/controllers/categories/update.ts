import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeUpdateCategoryUseCase } from "../../../use-cases/factories/categories/make-update-category-use-case";

export async function update(req: FastifyRequest, res: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    imageUrl: z.string().optional(),
  });

  const updateParamsSchema = z.object({
    categoryId: z.string().uuid(),
  });

  const { name, imageUrl } = updateBodySchema.parse(req.body);

  const { categoryId } = updateParamsSchema.parse(req.params);

  const updateUseCase = makeUpdateCategoryUseCase();

  const result = await updateUseCase.execute({
    categoryId,
    name,
    imageUrl,
  });

  if (result.isLeft()) {
    throw new NotFoundError("Category");
  }

  return res.status(204).send();
}
