/*
  Warnings:

  - Added the required column `email` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "email" TEXT NOT NULL;
