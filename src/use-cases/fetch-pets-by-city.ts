import { PetsRepository } from "@/repositories/pets-repostory";
import { Pet } from "@prisma/client";

interface FetchPetsByCityRequest {
  city: string;
}

interface FetchPetsByCityResponse {
  pets: Pet[];
}

export class FetchPetsByCity {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsByCityRequest): Promise<FetchPetsByCityResponse> {}
}
