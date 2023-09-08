/*
  Warnings:

  - Added the required column `zipCode` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "zipCode" TEXT NOT NULL;
