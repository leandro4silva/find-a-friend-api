import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetsDetailsUseCase } from "../get-pets-details";

export function makeGetPetsDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetPetsDetailsUseCase(petsRepository);

  return useCase;
}
