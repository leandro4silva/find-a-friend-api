import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(
    data: Prisma.OrgCreateWithoutAddressesInput,
    addressId: string,
  ): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
  findById(orgId: string): Promise<Org | null>;
}
