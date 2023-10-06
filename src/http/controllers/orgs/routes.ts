import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { create } from "./create";
import { whatsapp } from "./whatsapp";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate);
  app.post("/orgs", create);
  app.get("/orgs/whatsapp", whatsapp);
}
