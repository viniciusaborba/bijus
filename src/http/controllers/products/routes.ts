import { FastifyInstance } from "fastify";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { register } from "./create";
import { Delete } from "./delete";
import { listBySlug } from "./list-by-slug";

export async function productsRoutes(app: FastifyInstance) {
  app.post("/products", { onRequest: [verifyUserRole("ADMIN")] }, register);
  app.delete(
    "/products/:productId",
    { onRequest: [verifyUserRole("ADMIN")] },
    Delete
  );
  app.get("/products/list-by-slug", listBySlug);
}
