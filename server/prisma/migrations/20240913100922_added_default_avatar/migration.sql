/*
  Warnings:

  - Made the column `refreshToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET DEFAULT 'https://i.pinimg.com/564x/36/72/fa/3672fae383c1cbabe5bf4408c9e4ef2b.jpg',
ALTER COLUMN "refreshToken" SET NOT NULL;
