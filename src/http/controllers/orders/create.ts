import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "../../../use-cases/factories/users/make-register-use-case";
import { AlreadyExistsError } from "../../../errors/already-exists-error";
import { makeCreateOrderUseCase } from "@/use-cases/factories/orders/make-register-order-factory";
import { ReadOrderPresenter } from "@/presenter/read-order-presenter";

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    userId: z.string(),
    products: z.array(
      z.object({
        productId: z.string(),
      })
    ),
  });

  const { userId, products } = createBodySchema.parse(req.body);

  const createOrderUseCase = makeCreateOrderUseCase();

  const { order } = await createOrderUseCase.execute({
    userId,
    products,
  });

  return res.status(201).send({ order: ReadOrderPresenter.toHTTP(order) });
}
