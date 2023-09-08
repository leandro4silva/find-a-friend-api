import { Photos, Prisma } from "@prisma/client";

export interface PhotosRepository {
  createMany(
    data: Prisma.PhotosCreateWithoutPetsInput[],
    petId: string,
  ): Promise<Photos[]>;
}
