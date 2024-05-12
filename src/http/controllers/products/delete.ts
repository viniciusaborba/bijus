import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeDeleteProductUserUseCase } from "../../../use-cases/factories/products/make-delete-product-use-case";

export async function Delete(req: FastifyRequest, res: FastifyReply) {
  const deleteCategoryParamsSchema = z.object({
    productId: z.string(),
  });

  const { productId } = deleteCategoryParamsSchema.parse(req.params);

  const deleteUseCase = makeDeleteProductUserUseCase();

  const result = await deleteUseCase.execute({
    productId,
  });

  if (result.isLeft()) {
    throw new NotFoundError("Category");
  }

  return res.status(204).send();
}
