import { Photo, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PhotosRepository } from "../photos-repository";

export class InMemoryPhotosRepository implements PhotosRepository {
  private items: Photo[] = [];

  async createMany(data: Prisma.PhotoCreateManyInput[]) {
    const photos = data.map((item) => {
      const photo = {
        id: item.id ?? randomUUID(),
        filename: item.filename,
        path: item.path,
        petsId: item.petsId,
      };

      this.items.push(photo);

      return photo;
    });

    return photos;
  }
}
