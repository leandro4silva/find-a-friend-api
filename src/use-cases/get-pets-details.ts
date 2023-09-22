import { PetsRepository } from "@/repositories/pets-repostory";
import { Pet } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface GetPetsDetailsRequest {
  petId: string;
}

interface GetPetsDetailsResponse {
  pet: Pet;
}

export class GetPetsDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetsDetailsRequest): Promise<GetPetsDetailsResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new InvalidCredentialsError();
    }

    return {
      pet,
    };
  }
}
