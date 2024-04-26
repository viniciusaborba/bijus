import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import { env } from "./env";
import { userRoutes } from "./http/controllers/users/routes";
import { categoriesRoutes } from "./http/controllers/categories/routes";

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

app.register(cookie);
app.register(userRoutes);
app.register(categoriesRoutes);
