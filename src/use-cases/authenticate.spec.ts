import { AddressesRepository } from "@/repositories/addresses-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcrypt";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgsRepository: OrgsRepository;
let addressesRepository: AddressesRepository;
let sut: AuthenticateUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
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

    const { org } = await sut.execute({
      email: "johndoeorg@example.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(async () => {
      await sut.execute({
        email: "johndoeorg@example.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
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

    expect(async () => {
      await sut.execute({
        email: "johndoeorg@example.com",
        password: "1234567",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
