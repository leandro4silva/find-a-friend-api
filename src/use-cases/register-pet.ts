import { PetsRepository } from "@/repositories/pets-repostory";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";
import { ageAnimal, sizeAnimal, energyAnimal, Prisma } from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  about?: string;
  age: ageAnimal;
  size: sizeAnimal;
  energy: energyAnimal;
  photos: Prisma.PhotosCreateWithoutPetsInput[];
  requirements: Prisma.RequirementsCreateWithoutPetsInput[];
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
  }: RegisterPetUseCaseRequest) {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
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
