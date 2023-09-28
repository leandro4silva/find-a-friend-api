import { Prisma, Requirement } from "@prisma/client";

export interface RequirementsRepository {
  createMany(data: Prisma.RequirementCreateManyInput[]): Promise<Requirement[]>;
}
