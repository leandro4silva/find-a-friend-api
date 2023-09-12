import { Address, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { AddressesRepository } from "../addresses-repository";

export class InMemoryAddressesRepository implements AddressesRepository {
  private items: Address[] = [];

  async create(data: Prisma.AddressCreateInput) {
    const addresses = {
      id: data.id ?? randomUUID(),
      city: data.city,
      complement: data.complement,
      locality: data.locality,
      street: data.street,
      neighborhood: data.neighborhood,
      zipCode: data.zipCode,
    };

    this.items.push(addresses);

    return addresses;
  }
}
