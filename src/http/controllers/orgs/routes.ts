import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { create } from "./create";
import { whatsapp } from "./whatsapp";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate);
  app.post("/orgs", create);
  app.post("/orgs/whatsapp", { onRequest: [verifyJWT] }, whatsapp);
}
