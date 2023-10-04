import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAithenticateOrg(app: FastifyInstance) {
  const address = await prisma.address.create({
    data: {
      city: "example city",
      complement: "example completement",
      zipCode: "zipCode-01",
      locality: "example locality",
      street: "example street",
      neighborhood: "example neighborhood",
    },
  });

  await prisma.org.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      whatsapp: "19999999999",
      password_hash: await hash("1234567", 6),
      addressId: address.id,
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "1234567",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
