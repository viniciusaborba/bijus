import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    const { sub } = await req.jwtVerify<{ sub: string }>();
  } catch (err) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
}
