import { Prisma, Pet, Org, Address } from "@prisma/client";
import { PetsRepository } from "../pets-repostory";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public orgs: Org[] = [];
  public addresses: Address[] = [];
  public pets: Pet[] = [];

  async create(data: Prisma.PetCreateManyInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? "",
      age: data.age,
      size: data.size,
      energy: data.energy,
      orgId: data.orgId,
      enviroment: data.enviroment,
      dependence: data.dependence,
    };

    this.pets.push(pet);

    return pet;
  }

  async findManyByCity(city: string, page: number) {
    const addresses = this.addresses.filter((address) => address.city === city);

    const orgs = this.orgs.filter((org) => {
      return addresses.filter((address) => address.id === org.addressId);
    });

    const pets = this.pets.filter((pet) => {
      return orgs.filter((org) => org.id === pet.id);
    });

    return pets.slice((page - 1) * 20, page * 20);
  }
}
