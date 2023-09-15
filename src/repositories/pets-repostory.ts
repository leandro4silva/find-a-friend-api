import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetCreateManyInput): Promise<Pet>;
}
