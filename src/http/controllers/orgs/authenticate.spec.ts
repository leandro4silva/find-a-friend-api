import { app } from "@/app";
import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from "supertest";

describe("Authenticate (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.ready();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/orgs").send({
      name: "John Doe",
      email: "johndoe@example.com",
      zipCode: "13385074",
      whatsapp: "19999999999",
      password: "1234567",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "1234567",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
