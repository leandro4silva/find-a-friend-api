import { Prisma } from "@prisma/client";
import { PhotosRepository } from "../photos-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPhotosRepository implements PhotosRepository {
  async createMany(data: Prisma.PhotoCreateManyInput[]) {
    const lastIndex = await prisma.photo.createMany({
      data,
    });

    const photos = await prisma.photo.findMany({
      take: lastIndex.count,
      orderBy: {
        id: "desc",
      },
    });

    return photos;
  }
}
