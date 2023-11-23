-- CreateTable
CREATE TABLE `Ahoj` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(60) NOT NULL,

    UNIQUE INDEX `Ahoj_username_key`(`username`),
    UNIQUE INDEX `Ahoj_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
