import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AlreadyExistsError } from "../../../errors/already-exists-error";
import { makeReadCategoryUseCase } from "../../../use-cases/factories/categories/make-read-category-use-case";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeFindOrderProductUseCase } from "@/use-cases/factories/order-products/make-find-order-products";

export async function find(req: FastifyRequest, res: FastifyReply) {
  const findOrderProductBodySchema = z.object({
    orderId: z.string(),
  });

  const { orderId } = findOrderProductBodySchema.parse(req.body);

  const findOrderProductUseCase = makeFindOrderProductUseCase();

  const result = await findOrderProductUseCase.execute({
    orderId,
  });

  if (result.isLeft()) {
    throw new NotFoundError("OrderProducts");
  }

  const orderProducts = result.value.orderProducts;

  return res.status(200).send({ orderProducts });
}
