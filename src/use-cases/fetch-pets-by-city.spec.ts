import { FetchPetsByCity } from "./fetch-pets-by-city";
import { describe, expect, it } from "vitest";
import { beforeEach } from "node:test";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { randomUUID } from "node:crypto";

let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsByCity;

describe("Fetch Pets By City Use Case", async () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new FetchPetsByCity(petsRepository);
  });

  it("should be able to fetch pets by city", async () => {
    // const addressId = randomUUID();

    console.log(petsRepository);

    // const orgId = randomUUID();

    // petsRepository.orgs.push({
    //   id: orgId,
    //   name: "John Doe Org",
    //   email: "johndoeorg@example.com",
    //   password_hash: await hash("12346", 6),
    //   whatsapp: "(19) 99999-9999",
    //   addressId,
    // });

    // for (let i = 1; i <= 22; i++) {
    //   petsRepository.create({
    //     id: `pet-${i}`,
    //     age: "PUPPY",
    //     energy: "HIGH",
    //     name: `pet-${i}`,
    //     orgId,
    //     size: "MEDIUM",
    //     about: "any_about",
    //   });
    // }

    // const { pets } = await sut.execute({
    //   city: "city-01",
    //   page: 2,
    // });

    // expect(pets).toHaveLength(2);
    // expect(pets).toEqual([
    //   expect.objectContaining({ id: "pet-21" }),
    //   expect.objectContaining({ name: "pet-21" }),
    // ]);
  });
});
