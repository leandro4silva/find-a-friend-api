import { Prisma } from "@prisma/client";
import { RequirementsRepository } from "../requirements-repository";
import { prisma } from "@/lib/prisma";

export class PrismaRequirementsRepository implements RequirementsRepository {
  async createMany(data: Prisma.RequirementCreateManyInput[]) {
    const lastIndex = await prisma.requirement.createMany({
      data,
    });

    const requirements = await prisma.requirement.findMany({
      take: lastIndex.count,
      orderBy: {
        id: "desc",
      },
    });

    return requirements;
  }
}
