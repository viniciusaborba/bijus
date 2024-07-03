import { FastifyInstance } from "fastify";
import { find } from "./find";

export async function orderProductsRoutes(app: FastifyInstance) {
  app.get("/order-products", find);
}
