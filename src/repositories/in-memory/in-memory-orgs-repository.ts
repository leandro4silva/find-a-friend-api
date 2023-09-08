import { Orgs, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  private items: Orgs[] = [];

  async create(
    data: Prisma.OrgsCreateWithoutAddressesInput,
    addressId: string,
  ) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      password: data.password,
      whatsapp: data.whatsapp,
      addressId,
    };

    this.items.push(org);

    return org;
  }
}
