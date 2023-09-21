import { PetsRepository } from "@/repositories/pets-repostory";
import { Pet } from "@prisma/client";

interface FetchPetsByCityRequest {
  city: string;
  page: number;
}

interface FetchPetsByCityResponse {
  pets: Pet[];
}

export class FetchPetsByCity {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FetchPetsByCityRequest): Promise<FetchPetsByCityResponse> {
    const pets = await this.petsRepository.findManyByCity(city, page);

    return {
      pets,
    };
  }
}
