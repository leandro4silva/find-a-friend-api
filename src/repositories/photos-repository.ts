import { Photos } from "@prisma/client";

export interface PhotosRepository {
  createMany(data: Photos[]): Promise<Photos[]>;
}
