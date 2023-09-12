import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcrypt";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
