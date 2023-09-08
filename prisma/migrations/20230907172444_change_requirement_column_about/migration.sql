/*
  Warnings:

  - Made the column `petsId` on table `photos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `petsId` on table `requirements` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_petsId_fkey";

-- DropForeignKey
ALTER TABLE "requirements" DROP CONSTRAINT "requirements_petsId_fkey";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "about" DROP NOT NULL;

-- AlterTable
ALTER TABLE "photos" ALTER COLUMN "petsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "requirements" ALTER COLUMN "petsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
