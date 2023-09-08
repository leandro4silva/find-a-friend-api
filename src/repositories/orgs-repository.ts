import { Orgs, Prisma } from "@prisma/client";

export interface OrgsRepository {
  create(
    data: Prisma.OrgsCreateWithoutAddressesInput,
    addressId: string,
  ): Promise<Orgs>;
}
