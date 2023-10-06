import { app } from "@/app";
import { describe, beforeAll, afterAll, it, expect } from "vitest";
import request from "supertest";
import { createAndAithenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Authenticate (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.ready();
  });

  it("should be able to get whatsapp from org", async () => {
    const { token } = await createAndAithenticateOrg(app);

    const response = await request(app.server)
      .get("/orgs/whatsapp")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      }),
    );
  });
});
