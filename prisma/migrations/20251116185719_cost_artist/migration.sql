/*
  Warnings:

  - Added the required column `cost` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "cost" DECIMAL(65,30) NOT NULL;
