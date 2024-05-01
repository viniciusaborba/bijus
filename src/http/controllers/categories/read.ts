import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AlreadyExistsError } from "../../../errors/already-exists-error";
import { makeReadCategoryUseCase } from "../../../use-cases/factories/categories/make-read-category-use-case";
import { NotFoundError } from "../../../errors/not-found-error";

export async function read(req: FastifyRequest, res: FastifyReply) {
  const readParamsSchema = z.object({
    categoryId: z.string().uuid(),
  });

  const { categoryId } = readParamsSchema.parse(req.params);

  const readUseCase = makeReadCategoryUseCase();

  const result = await readUseCase.execute({
    categoryId,
  });

  if (result.isLeft()) {
    throw new NotFoundError("Category");
  }

  const category = result.value.category;

  return res.status(200).send({ category });
}
