import { AddressesRepository } from "@/repositories/addresses-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcrypt";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { Org } from "@prisma/client";

interface CreateOrgRequest {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  zipCode: string;
  street: string;
  complement: string;
  neighborhood: string;
  locality: string;
  city: string;
}

interface CreateOrgResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(
    private orgsrepository: OrgsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    zipCode,
    whatsapp,
    city,
    neighborhood,
    complement,
    locality,
    street,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    const orgCreated = await this.orgsrepository.findByEmail(email);

    if (orgCreated) {
      throw new OrgAlreadyExistsError();
    }

    const address = await this.addressesRepository.create({
      city,
      complement,
      zipCode,
      locality,
      street,
      neighborhood,
    });

    const password_hash = await hash(password, 6);

    const org = await this.orgsrepository.create(
      {
        name,
        email,
        password_hash,
        whatsapp,
      },
      address.id,
    );

    return {
      org,
    };
  }
}
