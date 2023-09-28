import { Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateWithoutAddressesInput, addressId: string) {
    const org = await prisma.org.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        password_hash: data.password_hash,
        addressId,
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async findById(orgId: string) {
    const org = await prisma.org.findUnique({
      where: {
        id: orgId,
      },
    });

    return org;
  }
}
