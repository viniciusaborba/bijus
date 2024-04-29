import { FastifyReply, FastifyRequest } from "fastify";
import { makeReadUserUseCase } from "../../../use-cases/factories/users/make-read-use-case";
import { z } from "zod";
import { NotFoundError } from "../../../errors/not-found-error";
import { ReadUserPresenter } from "../../../presenter/read-user-presenter";

export async function read(req: FastifyRequest, res: FastifyReply) {
  const readUserParamsSchema = z.object({
    userId: z.string(),
  });

  const { userId } = readUserParamsSchema.parse(req.params);

  const readUseCase = makeReadUserUseCase();

  const result = await readUseCase.execute({
    userId,
  });

  if (result.isLeft()) {
    throw new NotFoundError("User");
  }

  const user = result.value.user;

  return res.status(200).send({
    user: ReadUserPresenter.toHTTP(user),
  });
}