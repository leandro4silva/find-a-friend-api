import { makeSearchPetUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsSchema = z.object({
    city: z.string(),
    page: z.coerce.number(),
    age: z.enum(["PUPPY", "ADULT"]).optional(),
    energy: z.enum(["LOW", "MID", "HIGH"]).optional(),
    size: z.enum(["LITTLE", "MEDIUM", "BIG"]).optional(),
    dependence: z.enum(["LOW", "MID", "HIGH"]).optional(),
    enviroment: z.enum(["WIDE", "MODERATE", "NARROW"]).optional(),
  });

  const { city, page, age, energy, size, dependence, enviroment } =
    searchPetsSchema.parse(request.query);

  const searchPetsUseCase = makeSearchPetUseCase();

  const { pets } = await searchPetsUseCase.execute({
    city,
    page,
    age,
    energy,
    size,
    dependence,
    enviroment,
  });

  return reply.status(200).send({ pets });
}
