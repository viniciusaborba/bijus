import { FastifyInstance } from "fastify";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { register } from "./create";
import { Delete } from "./delete";

export async function productsRoutes(app: FastifyInstance) {
  app.post("/products", { onRequest: [verifyUserRole("ADMIN")] }, register);
  app.delete(
    "/products/:productId",
    { onRequest: [verifyUserRole("ADMIN")] },
    Delete
  );
}
