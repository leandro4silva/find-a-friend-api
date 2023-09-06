import { Pets, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetsCreateInput): Promise<Pets>;
}
