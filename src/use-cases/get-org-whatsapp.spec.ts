import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";
import { hash } from "bcrypt";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { GetOrgWhatsappUseCase } from "./get-org-whatsapp";

let sut: GetOrgWhatsappUseCase;
let petsRepository: InMemoryPetsRepository;
let addressesRepository: InMemoryAddressesRepository;
let orgsRepository: InMemoryOrgsRepository;

describe("Get Org Whatsapp Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    addressesRepository = new InMemoryAddressesRepository();

    sut = new GetOrgWhatsappUseCase(petsRepository, orgsRepository);
  });

  it("should be able to get org whatsapp", async () => {
    const address = await addressesRepository.create({
      city: "example city",
      complement: "example completement",
      zipCode: "zipCode-01",
      locality: "example locality",
      street: "example street",
      neighborhood: "example neighborhood",
    });

    const org = await orgsRepository.create(
      {
        name: "John Doe Org",
        email: "johndoeorg@example.com",
        whatsapp: "(19) 99999-9999",
        password_hash: await hash("123456", 6),
      },
      address.id,
    );

    const pet = await petsRepository.create({
      name: "John Doe",
      age: "PUPPY",
      energy: "LOW",
      size: "MEDIUM",
      orgId: org.id,
      dependence: "HIGH",
      enviroment: "MODERATE",
    });

    const { whatsapp } = await sut.execute({
      petId: pet.id,
    });

    expect(whatsapp).toEqual(expect.any(String));
  });

  it("should not be able to get org whatsapp with wrong pet id", async () => {
    expect(() =>
      sut.execute({
        petId: "pet-01",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
