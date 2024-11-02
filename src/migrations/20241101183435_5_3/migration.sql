-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `profile_picture_url` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NULL,
    `last_login` DATETIME(3) NULL,
    `tags` VARCHAR(191) NOT NULL,
    `itsActive` BOOLEAN NOT NULL DEFAULT true,
    `itsReported` BOOLEAN NOT NULL DEFAULT false,
    `points` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `business_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `tags` VARCHAR(191) NOT NULL,
    `wasValidated` BOOLEAN NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,
    `helpful_votes` INTEGER NOT NULL DEFAULT 0,
    `itsHided` BOOLEAN NOT NULL DEFAULT false,
    `itsReported` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Business` (
    `business_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `average_rating` DOUBLE NOT NULL DEFAULT 0.00,
    `total_reviews` INTEGER NOT NULL DEFAULT 0,
    `contact_info` VARCHAR(191) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `itsActive` BOOLEAN NOT NULL DEFAULT true,
    `itsReported` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Business_name_key`(`name`),
    PRIMARY KEY (`business_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `vote_id` INTEGER NOT NULL AUTO_INCREMENT,
    `review_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `isHelpful` BOOLEAN NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`vote_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reward` (
    `reward_id` INTEGER NOT NULL AUTO_INCREMENT,
    `points_needed` INTEGER NOT NULL,
    `reward_description` VARCHAR(191) NOT NULL,
    `is_redeemed` BOOLEAN NOT NULL DEFAULT false,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `redeemed_date` DATETIME(3) NULL,
    `expiration_date` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `itsAvailable` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`reward_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `reviewId` INTEGER NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `reportDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrer_id` INTEGER NOT NULL,
    `referred_id` INTEGER NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserRewards` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserRewards_AB_unique`(`A`, `B`),
    INDEX `_UserRewards_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `Business`(`business_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Review`(`review_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`review_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referrer_id_fkey` FOREIGN KEY (`referrer_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserRewards` ADD CONSTRAINT `_UserRewards_A_fkey` FOREIGN KEY (`A`) REFERENCES `Reward`(`reward_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserRewards` ADD CONSTRAINT `_UserRewards_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
