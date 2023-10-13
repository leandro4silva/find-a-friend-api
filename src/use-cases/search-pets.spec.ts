import { SearchPetsUseCase } from "./search-pets";
import { describe, expect, it, beforeEach } from "vitest";
import { randomUUID } from "node:crypto";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { hash } from "bcrypt";

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;
let orgId: string;

describe("Fetch Pets By City Use Case", async () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(petsRepository);

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

    orgId = randomUUID();

    petsRepository.orgs.push({
      id: orgId,
      name: "John Doe Org",
      email: "johndoeorg@example.com",
      password_hash: await hash("12346", 6),
      whatsapp: "(19) 99999-9999",
      addressId,
    });
  });

  it("should be able to fetch pets", async () => {
    await petsRepository.create({
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

    await petsRepository.create({
      id: `pet-02`,
      age: "ADULT",
      energy: "HIGH",
      name: `pet-02`,
      orgId,
      size: "MEDIUM",
      about: "any_about",
      dependence: "MID",
      enviroment: "WIDE",
    });

    const { pets } = await sut.execute({
      city: "city-01",
      page: 1,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-01" }),
      expect.objectContaining({ id: "pet-02" }),
    ]);
  });

  it("should be able to fetch paginated pets by city", async () => {
    for (let i = 1; i <= 22; i++) {
      petsRepository.create({
        id: `pet-${i}`,
        age: "PUPPY",
        energy: "HIGH",
        name: `pet-${i}`,
        orgId,
        size: "MEDIUM",
        about: "any_about",
        dependence: "HIGH",
        enviroment: "MODERATE",
      });
    }

    const { pets } = await sut.execute({
      city: "city-01",
      page: 2,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-21" }),
      expect.objectContaining({ id: "pet-22" }),
    ]);
  });

  it("should be able to fetch pets by characteristics", async () => {
    await petsRepository.create({
      id: `pet-01`,
      name: `pet-01`,
      orgId,
      about: "any_about",
      age: "ADULT",
      energy: "LOW",
      size: "LITTLE",
      dependence: "LOW",
      enviroment: "NARROW",
    });

    await petsRepository.create({
      id: `pet-02`,
      name: `pet-02`,
      orgId,
      about: "any_about",
      age: "ADULT",
      energy: "MID",
      size: "BIG",
      dependence: "MID",
      enviroment: "WIDE",
    });

    for (let i = 1; i <= 5; i++) {
      petsRepository.create({
        id: `pet-${i}`,
        name: `pet-${i}`,
        orgId,
        about: "any_about",
        age: "PUPPY",
        energy: "HIGH",
        size: "MEDIUM",
        dependence: "HIGH",
        enviroment: "MODERATE",
      });
    }

    const { pets } = await sut.execute({
      city: "city-01",
      page: 1,
      age: "PUPPY",
      energy: "HIGH",
      size: "MEDIUM",
      dependence: "HIGH",
      enviroment: "MODERATE",
    });

    expect(pets).toHaveLength(5);
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-1" }),
      expect.objectContaining({ id: "pet-2" }),
      expect.objectContaining({ id: "pet-3" }),
      expect.objectContaining({ id: "pet-4" }),
      expect.objectContaining({ id: "pet-5" }),
    ]);
  });
});
