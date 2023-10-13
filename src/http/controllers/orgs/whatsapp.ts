import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetOrgWhatsappUseCase } from "@/use-cases/factories/make-get-org-whatsapp-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function whatsapp(request: FastifyRequest, reply: FastifyReply) {
  const getWhatsappBodySchema = z.object({
    petId: z.string(),
  });

  const { petId } = getWhatsappBodySchema.parse(request.body);

  try {
    const getOrgWhatsappUseCase = makeGetOrgWhatsappUseCase();
    const { whatsapp } = await getOrgWhatsappUseCase.execute({ petId });
    return reply.status(200).send({ whatsapp });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      });
    }
  }
}
