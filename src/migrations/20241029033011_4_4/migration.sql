/*
  Warnings:

  - Added the required column `tags` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `business` ADD COLUMN `tags` VARCHAR(191) NOT NULL;
