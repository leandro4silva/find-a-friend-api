/*
  Warnings:

  - You are about to drop the column `name` on the `photos` table. All the data in the column will be lost.
  - Added the required column `filename` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photos" DROP COLUMN "name",
ADD COLUMN     "filename" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Orgs_pkey" PRIMARY KEY ("id")
);
