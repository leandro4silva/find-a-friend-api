import { AddressesRepository } from "@/repositories/addresses-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcrypt";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

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
  }: CreateOrgRequest) {
    // const { data } = await axios<QueryCepApiResponse>({
    //   method: "get",
    //   url: `https://viacep.com.br/ws/${cep}/json/`,
    // }).catch((error) => {
    //   console.error("❌ Address not found", error.response.status);
    //   throw new AddressNotFoundError();
    // });

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
