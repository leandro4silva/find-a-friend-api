import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetOrgWhatsappUseCase } from "../get-org-whatsapp";

export function makeGetOrgWhatsappUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new GetOrgWhatsappUseCase(petsRepository, orgsRepository);

  return useCase;
}
