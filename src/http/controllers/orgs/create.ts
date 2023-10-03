import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface ResponseViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    zipCode: z.string().refine((value) => value.length === 8, {
      message: "This field must have 8 characters",
    }),
    whatsapp: z.string().refine((value) => value.length === 11, {
      message: "This field must have 11 characters",
    }),
    password: z.string(),
  });

  const { name, email, zipCode, password, whatsapp } = createBodySchema.parse(
    request.body,
  );

  try {
    const { data } = await axios.get<ResponseViaCep>(
      `https://viacep.com.br/ws/${zipCode}/json`,
    );

    const address = {
      street: data.logradouro,
      neighborhood: data.bairro,
      complement: data.complemento,
      locality: data.localidade,
      city: data.uf,
      zipCode,
    };

    const dataSend = {
      name,
      email,
      password,
      whatsapp,
      ...address,
    };

    const createOrgUseCase = makeCreateOrgUseCase();
    await createOrgUseCase.execute(dataSend);

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({
        message: err.message,
      });
    }
  }
}
