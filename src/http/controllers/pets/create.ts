import { makeRegisterPetUseCase } from "@/use-cases/factories/make-register-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    age: z.enum(["PUPPY", "ADULT"]),
    energy: z.enum(["LOW", "MID", "HIGH"]),
    size: z.enum(["LITTLE", "MEDIUM", "BIG"]),
    orgId: z.string(),
    about: z.string().optional(),
    dependence: z.enum(["LOW", "MID", "HIGH"]),
    enviroment: z.enum(["WIDE", "MODERATE", "NARROW"]),
    photos: z
      .array(
        z.object({
          filename: z.string(),
          path: z.string(),
        }),
      )
      .nullable(),
    requirements: z
      .array(
        z.object({
          description: z.string(),
        }),
      )
      .nullable(),
  });

  const {
    name,
    age,
    energy,
    size,
    orgId,
    dependence,
    enviroment,
    about,
    photos,
    requirements,
  } = createBodySchema.parse(request.body);

  const createPetUseCase = makeRegisterPetUseCase();

  await createPetUseCase.execute({
    name,
    age,
    energy,
    size,
    orgId,
    dependence,
    enviroment,
    about,
    photos,
    requirements,
  });

  return reply.status(201).send();
}
