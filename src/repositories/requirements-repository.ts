import { Prisma, Requirements } from "@prisma/client";

export interface RequirementsRepository {
  createMany(
    data: Prisma.RequirementsCreateWithoutPetsInput[],
    petId: string,
  ): Promise<Requirements[]>;
}
