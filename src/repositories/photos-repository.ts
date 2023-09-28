import { Photo, Prisma } from "@prisma/client";

export interface PhotosRepository {
  createMany(data: Prisma.PhotoCreateManyInput[]): Promise<Photo[]>;
}
