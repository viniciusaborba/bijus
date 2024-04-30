import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateUserUseCase } from "../../../use-cases/factories/users/make-update-user-use-case";
import { NotFoundError } from "../../../errors/not-found-error";

export async function update(req: FastifyRequest, res: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().optional().optional(),
    email: z.string().email().optional(),
    cellphoneNumber: z.string().min(11).max(11).optional(),
    address: z.string().optional(),
  });

  const updateParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { name, address, cellphoneNumber, email } = updateBodySchema.parse(
    req.body
  );

  const { userId } = updateParamsSchema.parse(req.params);

  const updateUseCase = makeUpdateUserUseCase();

  const result = await updateUseCase.execute({
    userId,
    name,
    cellphoneNumber,
    address,
    email,
  });

  if (result.isLeft()) {
    throw new NotFoundError("User");
  }

  return res.status(204).send();
}
