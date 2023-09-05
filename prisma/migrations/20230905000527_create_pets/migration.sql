-- CreateEnum
CREATE TYPE "ageAnimal" AS ENUM ('PUPPY', 'ADULT');

-- CreateEnum
CREATE TYPE "sizeAnimal" AS ENUM ('LITTLE', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "energyAnimal" AS ENUM ('LOW', 'MID', 'HIGH');

-- CreateEnum
CREATE TYPE "enviromentAnimal" AS ENUM ('WIDE', 'MODERATE', 'NARROW');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "ageAnimal" NOT NULL,
    "size" "sizeAnimal" NOT NULL,
    "energy" "energyAnimal" NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "petsId" TEXT,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "petsId" TEXT,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
