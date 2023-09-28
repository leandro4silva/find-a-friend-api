import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repostory";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateManyInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findManyByCity(city: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        Org: {
          addresses: {
            city,
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return pets;
  }

  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    return pet;
  }
}
