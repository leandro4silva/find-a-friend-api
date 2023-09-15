import { describe, it, beforeEach, expect } from "vitest";
import { PetsRepository } from "@/repositories/pets-repostory";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryPhotosRepository } from "@/repositories/in-memory/in-memory-photos-repository";
import { InMemoryRequirementsRepository } from "@/repositories/in-memory/in-memory.requirements-repository";
import { RegisterPetUseCase } from "./register-pet";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcrypt";
import { AddressesRepository } from "@/repositories/addresses-repository";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";

let petsRepository: PetsRepository;
let photosRepository: PhotosRepository;
let requirementsRepository: RequirementsRepository;
let orgsRepository: OrgsRepository;
let addressesRepository: AddressesRepository;
let sut: RegisterPetUseCase;

describe("Register Use Case", () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository();
    photosRepository = new InMemoryPhotosRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    addressesRepository = new InMemoryAddressesRepository();

    sut = new RegisterPetUseCase(
      petsRepository,
      photosRepository,
      requirementsRepository,
    );

    const address = await addressesRepository.create({
      city: "example city",
      complement: "example completement",
      zipCode: "zipCode-01",
      locality: "example locality",
      street: "example street",
      neighborhood: "example neighborhood",
    });

    await orgsRepository.create(
      {
        name: "John Doe Org",
        email: "johndoeorg@example.com",
        whatsapp: "(19) 99999-9999",
        password_hash: await hash("123456", 6),
      },
      address.id,
    );
  });

  it("should be able to register a pet", async () => {
    const { pet } = await sut.execute({
      name: "John Doe",
      age: "PUPPY",
      energy: "LOW",
      size: "MEDIUM",
      orgId: "org-01",
      requirements: [
        {
          description: "example description",
        },
      ],
      photos: [
        {
          filename: "example.name",
          path: "./example.path",
        },
      ],
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.photos).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        filename: "example.name",
      }),
    ]);
    expect(pet.requirements).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        description: "example description",
      }),
    ]);
  });
});
