import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AlreadyExistsError } from "../../../errors/already-exists-error";
import { makeCreateProductUseCase } from "../../../use-cases/factories/products/make-create-product-use-case";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    basePrice: z.number(),
    imageUrls: z.array(z.string()),
    categoryId: z.string(),
    discountPercentage: z.number().optional(),
  });

  const {
    name,
    basePrice,
    categoryId,
    description,
    imageUrls,
    discountPercentage,
  } = registerBodySchema.parse(req.body);

  const createProductUseCase = makeCreateProductUseCase();

  const result = await createProductUseCase.execute({
    name,
    description,
    basePrice,
    categoryId,
    imageUrls,
    discountPercentage,
  });

  if (result.isLeft()) {
    throw new AlreadyExistsError("User");
  }

  const product = result.value.product;

  return res.status(201).send({ product });
}
