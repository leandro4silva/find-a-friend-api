import { describe, it, beforeEach, expect } from "vitest";
import { PetsRepository } from "@/repositories/pets-repostory";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryPhotosRepository } from "@/repositories/in-memory/in-memory-photos-repository";
import { InMemoryRequirementsRepository } from "@/repositories/in-memory/in-memory.requirements-repository";
import { RegisterPetUseCase } from "./register-pet";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";

let petsRepository: PetsRepository;
let photosRepository: PhotosRepository;
let requirementsRepository: RequirementsRepository;
let sut: RegisterPetUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    photosRepository = new InMemoryPhotosRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    sut = new RegisterPetUseCase(
      petsRepository,
      photosRepository,
      requirementsRepository,
    );
  });

  it("should be able to register a pet", async () => {
    const { pet } = await sut.execute({
      name: "John Doe",
      age: "PUPPY",
      energy: "LOW",
      size: "MEDIUM",
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
