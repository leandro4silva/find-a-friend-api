import { AddressesRepository } from "@/repositories/addresses-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";

interface CreateOrgRequest {
  name: string;
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
    zipCode,
    password,
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

    const address = await this.addressesRepository.create({
      city,
      complement,
      zipCode,
      locality,
      street,
      neighborhood,
    });

    const org = await this.orgsrepository.create(
      {
        name,
        password,
        whatsapp,
      },
      address.id,
    );

    return {
      org,
    };
  }
}
