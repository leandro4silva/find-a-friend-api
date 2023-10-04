import { app } from "@/app";
import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from "supertest";

describe("Create (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.ready();
  });

  it("should be able to create a org", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "John Doe",
      email: "johndoe@example.com",
      zipCode: "13385074",
      whatsapp: "19999999999",
      password: "1234567",
    });

    expect(response.statusCode).toEqual(201);
  });
});
