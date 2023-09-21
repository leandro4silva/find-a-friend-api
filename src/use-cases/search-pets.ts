import { PetsRepository } from "@/repositories/pets-repostory";
import {
  Pet,
  ageAnimal,
  sizeAnimal,
  energyAnimal,
  dependenceLevel,
  enviromentAnimal,
} from "@prisma/client";

interface SearchPetsRequest {
  city: string;
  page: number;
  age?: ageAnimal;
  energy?: energyAnimal;
  size?: sizeAnimal;
  dependence?: dependenceLevel;
  enviroment?: enviromentAnimal;
}

interface SearchPetsResponse {
  pets: Pet[];
}

export class SearchPets {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
    age,
    dependence,
    energy,
    enviroment,
    size,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.findManyByCity(city, page);

    if (age || dependence || energy || enviroment || size) {
      const filteredPets: Pet[] = [];

      pets.forEach((pet) => {
        if (
          (age && pet.age === age) ||
          (dependence && pet.dependence === dependence) ||
          (energy && pet.energy === energy) ||
          (enviroment && pet.enviroment === enviroment) ||
          (size && pet.size === size)
        ) {
          filteredPets.push(pet);
        }
      });

      return {
        pets: filteredPets,
      };
    }

    return {
      pets,
    };
  }
}
