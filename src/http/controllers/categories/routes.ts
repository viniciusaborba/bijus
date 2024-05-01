import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { unregister } from "./unregister";
import { search } from "./search-many";
import { read } from "./read";

export async function categoriesRoutes(app: FastifyInstance) {
  app.post("/categories", { onRequest: [verifyUserRole("ADMIN")] }, register);
  app.delete(
    "/categories/:categoryId",
    { onRequest: [verifyUserRole("ADMIN")] },
    unregister
  );
  app.get("/categories/search", search);
  app.get("/categories/:categoryId/read", read);
}
