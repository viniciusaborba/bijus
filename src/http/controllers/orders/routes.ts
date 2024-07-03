import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function ordersRoutes(app: FastifyInstance) {
  app.post("/orders", create);
}
