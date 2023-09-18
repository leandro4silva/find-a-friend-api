import { PetsRepository } from "@/repositories/pets-repostory";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";
import {
  ageAnimal,
  sizeAnimal,
  energyAnimal,
  Prisma,
  $Enums,
} from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  about?: string;
  age: ageAnimal;
  size: sizeAnimal;
  energy: energyAnimal;
  photos: Prisma.PhotoCreateWithoutPetsInput[];
  requirements: Prisma.RequirementCreateWithoutPetsInput[];
  orgId: string;
}

interface RegisterPetUseCaseResponse {
  pet: {
    requirements: Prisma.RequirementCreateWithoutPetsInput[];
    photos: Prisma.PhotoCreateWithoutPetsInput[];
    id: string;
    name: string;
    about: string | null;
    age: $Enums.ageAnimal;
    size: $Enums.sizeAnimal;
    energy: $Enums.energyAnimal;
    orgId: string;
  };
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private photosRepository: PhotosRepository,
    private requiremetsRepository: RequirementsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy,
    photos,
    requirements,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      orgId,
    });

    if (photos) {
      photos = await this.photosRepository.createMany(photos, pet.id);
    }

    if (requirements) {
      requirements = await this.requiremetsRepository.createMany(
        requirements,
        pet.id,
      );
    }

    const petCreted = {
      ...pet,
      requirements,
      photos,
    };

    return {
      pet: petCreted,
    };
  }
}
