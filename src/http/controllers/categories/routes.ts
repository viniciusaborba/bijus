import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyUserRole } from "../../middlewares/verify-user-role";

export async function categoriesRoutes(app: FastifyInstance) {
  app.post("/categories", { onRequest: [verifyUserRole("ADMIN")] }, register);
}
