import { PetsRepository } from "@/repositories/pets-repostory";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OrgsRepository } from "@/repositories/orgs-repository";

interface GetOrgWhatsappRequest {
  petId: string;
}

interface GetOrgWhatsappResponse {
  whatsapp: string;
}

export class GetOrgWhatsappUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsrepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetOrgWhatsappRequest): Promise<GetOrgWhatsappResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    const org = await this.orgsrepository.findById(pet.orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    return {
      whatsapp: org.whatsapp,
    };
  }
}
