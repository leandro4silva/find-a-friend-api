import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetCreateManyInput): Promise<Pet>;
  findManyByCity(city: string, page: number): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | null>;
}
