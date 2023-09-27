import { describe, beforeEach, it, expect } from "vitest";
import { GetPetsDetailsUseCase } from "./get-pets-details";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let sut: GetPetsDetailsUseCase;
let petsRepository: InMemoryPetsRepository;

describe("Get Pets Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetsDetailsUseCase(petsRepository);
  });

  it("should be able to get pet details", async () => {
    const addressId = randomUUID();

    petsRepository.addresses.push({
      id: randomUUID(),
      zipCode: "01001000",
      city: "city-01",
      locality: "locality-01",
      complement: "complement-01",
      street: "street-01",
      neighborhood: "neighborhood-01",
    });

    const orgId = randomUUID();

    petsRepository.orgs.push({
      id: orgId,
      name: "John Doe Org",
      email: "johndoeorg@example.com",
      password_hash: await hash("12346", 6),
      whatsapp: "(19) 99999-9999",
      addressId,
    });

    petsRepository.pets.push({
      id: `pet-01`,
      age: "PUPPY",
      energy: "HIGH",
      name: `pet-01`,
      orgId,
      size: "MEDIUM",
      about: "any_about",
      dependence: "MID",
      enviroment: "WIDE",
    });

    const { pet } = await sut.execute({
      petId: "pet-01",
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual("pet-01");
  });

  it("should not be able to get pet details with wrong id", async () => {
    expect(() =>
      sut.execute({
        petId: "pet-01",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
