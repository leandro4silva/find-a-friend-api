import { Addresses, Prisma } from "@prisma/client";

export interface AddressesRepository {
  create(data: Prisma.AddressesCreateInput): Promise<Addresses>;
}
