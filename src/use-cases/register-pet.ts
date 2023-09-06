import { PetsRepository } from "@/repositories/pets-repostory";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";
import {
  ageAnimal,
  sizeAnimal,
  energyAnimal,
  Photos,
  Requirements,
} from "@prisma/client";

interface RegisterPetUseCaseRequest {
  name: string;
  about: string;
  age: ageAnimal;
  size: sizeAnimal;
  energy: energyAnimal;
  photos: Photos[];
  requirements: Requirements[];
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
      const photosWithPetId = photos.map((photo) => {
        photo.petsId = pet.id;
        return photo;
      });

      await this.photosRepository.createMany(photosWithPetId);
    }

    if (requirements) {
      const requirementsWithPetId = requirements.map((requirements) => {
        requirements.petsId = pet.id;
        return requirements;
      });

      await this.requiremetsRepository.createMany(requirementsWithPetId);
    }
  }
}
