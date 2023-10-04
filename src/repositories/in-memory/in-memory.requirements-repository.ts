import { Prisma, Requirement } from "@prisma/client";
import { RequirementsRepository } from "../requirements-repository";
import { randomUUID } from "crypto";

export class InMemoryRequirementsRepository implements RequirementsRepository {
  private item: Requirement[] = [];

  async createMany(data: Prisma.RequirementCreateManyInput[]) {
    const requirements = data.map((requirement) => {
      const requirementWithPetId = {
        id: requirement.id ?? randomUUID(),
        description: requirement.description,
        petsId: requirement.petsId,
      };

      this.item.push(requirementWithPetId);
      return requirementWithPetId;
    });

    return requirements;
  }
}
