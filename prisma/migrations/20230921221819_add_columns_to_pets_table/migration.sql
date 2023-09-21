/*
  Warnings:

  - Added the required column `dependence` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enviroment` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "dependenceLevel" AS ENUM ('LOW', 'MID', 'HIGH');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "dependence" "dependenceLevel" NOT NULL,
ADD COLUMN     "enviroment" "enviromentAnimal" NOT NULL;
