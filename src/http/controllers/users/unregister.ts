import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { NotFoundError } from "../../../errors/not-found-error";
import { makeUnregisterUserUseCase } from "../../../use-cases/factories/users/make-unregister-user-use-case";

export async function unregister(req: FastifyRequest, res: FastifyReply) {
  const unregisterUserParamsSchema = z.object({
    userId: z.string(),
  });

  const { userId } = unregisterUserParamsSchema.parse(req.params);

  const unregisterUseCase = makeUnregisterUserUseCase();

  const result = await unregisterUseCase.execute({
    userId,
  });

  if (result.isLeft()) {
    throw new NotFoundError("User");
  }

  return res.status(204).send();
}
