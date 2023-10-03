import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "../create-org";
import { PrismaAddressesRepository } from "@/repositories/prisma/prisma-addresses-repository";

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const addressRepository = new PrismaAddressesRepository();
  const useCase = new CreateOrgUseCase(orgsRepository, addressRepository);

  return useCase;
}
