import { app } from "@/app";
import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from "supertest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { prisma } from "@/lib/prisma";

describe("Create (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.ready();
  });

  it("should be able create a pet", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const org = await prisma.org.findFirstOrThrow();

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe",
        age: "PUPPY",
        energy: "LOW",
        size: "MEDIUM",
        orgId: org.id,
        dependence: "HIGH",
        enviroment: "MODERATE",
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

    // console.log(response.body);

    expect(response.statusCode).toEqual(201);
  });
});
