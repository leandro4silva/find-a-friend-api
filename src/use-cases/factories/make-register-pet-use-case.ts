import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaRequirementsRepository } from "@/repositories/prisma/prisma-requirements-repository";
import { PrismaPhotosRepository } from "@/repositories/prisma/prisma-photos-repository";
import { RegisterPetUseCase } from "../register-pet";

export function makeRegisterPetUseCase() {
  const requirementsRepository = new PrismaRequirementsRepository();
  const photosRepository = new PrismaPhotosRepository();
  const petsRepository = new PrismaPetsRepository();
  const useCase = new RegisterPetUseCase(
    petsRepository,
    photosRepository,
    requirementsRepository,
  );

  return useCase;
}
