import { FastifyReply, FastifyRequest } from "fastify";
import { normalize } from "path";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../../use-cases/factories/users/make-authenticate-use-case";
import { InvalidCredentialsError } from "../../../errors/invalid-credentials-error";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const registerUseCase = makeAuthenticateUseCase();

    const result = await registerUseCase.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      throw new InvalidCredentialsError();
    }

    const user = result.value.user;

    const token = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
        user: user.role,
        name: user.name,
        role: user.role,
      });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({
        message: err.message,
      });
    }

    throw err;
  }
}
