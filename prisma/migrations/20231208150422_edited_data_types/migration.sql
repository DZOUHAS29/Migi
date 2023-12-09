-- AlterTable
ALTER TABLE `records` MODIFY `type` VARCHAR(20) NOT NULL,
    MODIFY `cause` VARCHAR(30) NOT NULL,
    MODIFY `day_part` VARCHAR(10) NOT NULL;
