/*
  Warnings:

  - You are about to drop the `Orgs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Orgs";

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
