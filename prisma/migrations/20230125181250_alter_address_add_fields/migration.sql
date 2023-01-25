/*
  Warnings:

  - Added the required column `city` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `number` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;
