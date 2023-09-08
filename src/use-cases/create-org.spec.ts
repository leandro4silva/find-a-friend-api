import { AddressesRepository } from "@/repositories/addresses-repository";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateOrgUseCase } from "./create-org";

let orgsRepository: OrgsRepository;
let addressesRepository: AddressesRepository;
let sut: CreateOrgUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    sut = new CreateOrgUseCase(orgsRepository, addressesRepository);
  });

  it("should be able to create a org", async () => {
    const { org } = await sut.execute({
      name: "John Doe Org",
      zipCode: "01001000",
      password: "123456",
      whatsapp: "(19) 99999-9999",
      city: "city-01",
      locality: "locality-01",
      complement: "complement-01",
      street: "street-01",
      neighborhood: "neighborhood-01",
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org.addressId).toEqual(expect.any(String));
  });
});
