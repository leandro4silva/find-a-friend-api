import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../search-pets";

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new SearchPetsUseCase(petsRepository);

  return useCase;
}
