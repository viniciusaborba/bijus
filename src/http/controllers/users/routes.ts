import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";
import { read } from "./read";
import { unregister } from "./unregister";
import { update } from "./update";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.patch("/token/refresh", refresh);
  app.get("/users/:userId", read);
  app.delete("/users/:userId", unregister);
  app.put("/users/:userId", update);
}
