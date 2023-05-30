/*
  Warnings:

  - You are about to drop the column `creteadAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "creteadAt",
ADD COLUMN     "createadAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
