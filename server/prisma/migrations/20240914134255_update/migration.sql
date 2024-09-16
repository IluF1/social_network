/*
  Warnings:

  - You are about to drop the column `authorLogin` on the `Post` table. All the data in the column will be lost.
  - Added the required column `login` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorLogin_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorLogin",
ADD COLUMN     "login" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_login_fkey" FOREIGN KEY ("login") REFERENCES "User"("login") ON DELETE RESTRICT ON UPDATE CASCADE;
