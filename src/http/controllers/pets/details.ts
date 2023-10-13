import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetPetsDetailsUseCase } from "@/use-cases/factories/make-get-pets-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsBodySchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = detailsBodySchema.parse(request.params);

  try {
    const getDetailsPetUseCase = makeGetPetsDetailsUseCase();
    const { pet } = await getDetailsPetUseCase.execute({ petId });

    return reply.status(200).send({ pet });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      });
    }
  }
}
