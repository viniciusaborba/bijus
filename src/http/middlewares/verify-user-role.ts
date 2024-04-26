import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: "ADMIN" | "USER") {
  return async (req: FastifyRequest, res: FastifyReply) => {
    await req.jwtVerify();

    const role = req.user.role

    if (role !== roleToVerify) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
  };
}
