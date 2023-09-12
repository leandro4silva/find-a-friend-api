import { Prisma, Requirement } from "@prisma/client";
import { RequirementsRepository } from "../requirements-repository";
import { randomUUID } from "crypto";

export class InMemoryRequirementsRepository implements RequirementsRepository {
  private item: Requirement[] = [];

  async createMany(
    data: Prisma.RequirementCreateWithoutPetsInput[],
    petId: string,
  ) {
    const requirements = data.map((requirement) => {
      const requirementWithPetId = {
        id: requirement.id ?? randomUUID(),
        description: requirement.description,
        petsId: petId,
      };

      this.item.push(requirementWithPetId);
      return requirementWithPetId;
    });

    return requirements;
  }
}
