import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import { env } from "./env";
import { userRoutes } from "./http/controllers/users/routes";
import { categoriesRoutes } from "./http/controllers/categories/routes";
import cors from "@fastify/cors";
import { productsRoutes } from "./http/controllers/products/routes";
import { ordersRoutes } from "./http/controllers/orders/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(cors, {
  origin: "*",
});
app.register(cookie);
app.register(userRoutes);
app.register(categoriesRoutes);
app.register(productsRoutes);
app.register(ordersRoutes);
