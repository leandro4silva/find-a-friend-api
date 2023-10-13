import { app } from "@/app";
import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { prisma } from "@/lib/prisma";

describe("Details (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.ready();
  });

  it("should be able to a pet details", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const org = await prisma.org.findFirstOrThrow();

    const pet = await prisma.pet.create({
      data: {
        name: "John Doe",
        age: "PUPPY",
        energy: "LOW",
        size: "MEDIUM",
        orgId: org.id,
        dependence: "HIGH",
        enviroment: "MODERATE",
      },
    });

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: "John Doe",
      }),
    );
  });
});
