-- AlterTable
ALTER TABLE `business` ADD COLUMN `itsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `itsReported` BOOLEAN NOT NULL DEFAULT false;
