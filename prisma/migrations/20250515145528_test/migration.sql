/*
  Warnings:

  - You are about to drop the column `isSent` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `isArchived` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "isSent",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL;
