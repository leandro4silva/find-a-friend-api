import fastify from "fastify";
import { env } from "./env";
import { fastifyJwt } from "@fastify/jwt";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.NODE_ENV,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(petsRoutes);
