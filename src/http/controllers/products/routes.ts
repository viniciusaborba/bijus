import { FastifyInstance } from "fastify";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { register } from "./create";

export async function productsRoutes(app: FastifyInstance) {
  app.post("/products", { onRequest: [verifyUserRole("ADMIN")] }, register);
}
