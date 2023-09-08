import { Prisma, Pets } from "@prisma/client";
import { PetsRepository } from "../pets-repostory";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  private items: Pets[] = [];

  async create(data: Prisma.PetsCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? "",
      age: data.age,
      size: data.size,
      energy: data.energy,
    };

    this.items.push(pet);

    return pet;
  }
}
