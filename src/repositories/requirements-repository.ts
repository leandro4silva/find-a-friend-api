import { Requirements } from "@prisma/client";

export interface RequirementsRepository {
  createMany(data: Requirements[]): Promise<Requirements[]>;
}
