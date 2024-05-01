import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AlreadyExistsError } from "../../../errors/already-exists-error";
import { makeRegisterCategoryUseCase } from "../../../use-cases/factories/categories/make-register-use-case";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
  });

  const { name, imageUrl } = registerBodySchema.parse(req.body);

  const registerUseCase = makeRegisterCategoryUseCase();

  const result = await registerUseCase.execute({
    name,
    imageUrl,
  });

  if (result.isLeft()) {
    throw new AlreadyExistsError("Category");
  }

  const category = result.value.category;

  return res.status(201).send({ category });
}
