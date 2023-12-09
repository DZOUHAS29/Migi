/*
  Warnings:

  - Added the required column `day_part` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `records` ADD COLUMN `day_part` CHAR(10) NOT NULL,
    MODIFY `date` DATE NOT NULL;
