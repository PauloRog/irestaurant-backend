-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'EMPLOYEE', 'SUPPLIER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "connectionType" SET DEFAULT 'PASS';
