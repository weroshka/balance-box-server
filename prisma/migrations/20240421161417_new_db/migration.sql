-- CreateTable
CREATE TABLE `expense` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `DATA` DATETIME(0) NOT NULL DEFAULT (curdate()),
    `COST` INTEGER NOT NULL,
    `SALES_RECEIPT` BINARY(255) NULL,
    `STAFF_ID` INTEGER NOT NULL,
    `TYPE_EXPENSES_ID` INTEGER NOT NULL,

    INDEX `STAFF_ID`(`STAFF_ID`),
    INDEX `TYPE_EXPENSES_ID`(`TYPE_EXPENSES_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `SURNAME` VARCHAR(512) NOT NULL,
    `NAME` VARCHAR(512) NOT NULL,
    `FATHER_NAME` VARCHAR(512) NULL,
    `EMAIL` VARCHAR(256) NOT NULL,
    `PASSWORD` VARCHAR(512) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_group` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `STAFF_ID` INTEGER NOT NULL,
    `GROUP_ID` INTEGER NOT NULL,

    INDEX `GROUP_ID`(`GROUP_ID`),
    INDEX `STAFF_ID`(`STAFF_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_period` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `DATE_BEGIN` DATETIME(0) NOT NULL,
    `DATE_END` DATETIME(0) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_expenses` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(512) NOT NULL,
    `DESCRIPTION` VARCHAR(1024) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_expenses_and_time_period` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `MARGINAL_COST` INTEGER NOT NULL,
    `TIME_PERIOD_ID` INTEGER NOT NULL,
    `TYPE_EXPENSES_ID` INTEGER NOT NULL,

    INDEX `TIME_PERIOD_ID`(`TIME_PERIOD_ID`),
    INDEX `TYPE_EXPENSES_ID`(`TYPE_EXPENSES_ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_group` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `NAME` VARCHAR(512) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`STAFF_ID`) REFERENCES `staff`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_ibfk_2` FOREIGN KEY (`TYPE_EXPENSES_ID`) REFERENCES `type_expenses`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `staff_group` ADD CONSTRAINT `staff_group_ibfk_1` FOREIGN KEY (`STAFF_ID`) REFERENCES `staff`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `staff_group` ADD CONSTRAINT `staff_group_ibfk_2` FOREIGN KEY (`GROUP_ID`) REFERENCES `work_group`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `type_expenses_and_time_period` ADD CONSTRAINT `type_expenses_and_time_period_ibfk_1` FOREIGN KEY (`TIME_PERIOD_ID`) REFERENCES `time_period`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `type_expenses_and_time_period` ADD CONSTRAINT `type_expenses_and_time_period_ibfk_2` FOREIGN KEY (`TYPE_EXPENSES_ID`) REFERENCES `type_expenses`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
