import { Photo, Prisma } from "@prisma/client";

export interface PhotosRepository {
  createMany(
    data: Prisma.PhotoCreateWithoutPetsInput[],
    petId: string,
  ): Promise<Photo[]>;
}
