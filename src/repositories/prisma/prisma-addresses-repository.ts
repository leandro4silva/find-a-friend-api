import { prisma } from "@/lib/prisma";
import { AddressesRepository } from "../addresses-repository";
import { Prisma } from "@prisma/client";

export class PrismaAddressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressCreateInput) {
    const address = await prisma.address.create({
      data,
    });

    return address;
  }
}
