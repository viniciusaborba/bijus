/*
  Warnings:

  - You are about to drop the column `basePrice` on the `OrderProduct` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "basePrice",
DROP COLUMN "discountPercentage";
