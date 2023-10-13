import { PetsRepository } from "@/repositories/pets-repostory";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";
import {
  ageAnimal,
  sizeAnimal,
  energyAnimal,
  Prisma,
  $Enums,
  dependenceLevel,
  enviromentAnimal,
} from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  about?: string;
  age: ageAnimal;
  size: sizeAnimal;
  energy: energyAnimal;
  photos: Prisma.PhotoCreateWithoutPetsInput[] | null;
  requirements: Prisma.RequirementCreateWithoutPetsInput[] | null;
  orgId: string;
  enviroment: enviromentAnimal;
  dependence: dependenceLevel;
}

interface RegisterPetUseCaseResponse {
  pet: {
    requirements: Prisma.RequirementCreateWithoutPetsInput[] | null;
    photos: Prisma.PhotoCreateWithoutPetsInput[] | null;
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
    dependence,
    enviroment,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      orgId,
      dependence,
      enviroment,
    });

    if (photos) {
      const photosWithPetId = photos.map((photo) => {
        return {
          filename: photo.filename,
          path: photo.path,
          petsId: pet.id,
        };
      });

      photos = await this.photosRepository.createMany(photosWithPetId);
    }

    if (requirements) {
      const requirementsWithPetId = requirements.map((requirement) => {
        return {
          id: requirement.id,
          description: requirement.description,
          petsId: pet.id,
        };
      });

      requirements = await this.requiremetsRepository.createMany(
        requirementsWithPetId,
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
