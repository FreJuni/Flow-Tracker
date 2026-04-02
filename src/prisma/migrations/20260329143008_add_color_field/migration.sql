/*
  Warnings:

  - You are about to drop the column `type` on the `category` table. All the data in the column will be lost.
  - Added the required column `color` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `category` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "category" DROP COLUMN "type",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL;
