import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "../../../use-cases/factories/users/make-register-use-case";
import { AlreadyExistsError } from "../../../errors/already-exists-error";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string().min(11).max(14),
    password: z.string().min(6),
    cellphoneNumber: z.string(),
    address: z.string(),
  });

  const { cpf, name, password, address, cellphoneNumber, email } =
    registerBodySchema.parse(req.body);

  const registerUseCase = makeRegisterUseCase();

  const result = await registerUseCase.execute({
    name,
    cpf,
    password,
    address,
    cellphoneNumber,
    email,
  });

  if (result.isLeft()) {
    throw new AlreadyExistsError("User");
  }

  return res.status(201).send();
}
