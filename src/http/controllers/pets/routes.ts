import { FastifyInstance } from "fastify";

export async function petsRoutes(app: FastifyInstance) {
  app.get("/pets", (request, response) => {
    return response.send("pets");
  });
}
