import { Photos, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PhotosRepository } from "../photos-repository";

export class InMemoryPhotosRepository implements PhotosRepository {
  private items: Photos[] = [];

  async createMany(data: Prisma.PhotosCreateWithoutPetsInput[], petId: string) {
    const photos = data.map((item) => {
      const photo = {
        id: item.id ?? randomUUID(),
        filename: item.filename,
        path: item.path,
        petsId: petId,
      };

      this.items.push(photo);

      return photo;
    });

    return photos;
  }
}
