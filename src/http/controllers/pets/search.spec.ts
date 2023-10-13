import { app } from "@/app";
import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { prisma } from "@/lib/prisma";

describe("Search (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.ready();
  });

  it("should be able to search pets", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const org = await prisma.org.findFirstOrThrow();

    await prisma.pet.create({
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
      .get("/pets/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        city: "example city",
        page: "1",
        age: "PUPPY",
        energy: "LOW",
        size: "MEDIUM",
        dependence: "HIGH",
        enviroment: "MODERATE",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: "John Doe",
      }),
    ]);
  });
});
