/*
  Warnings:

  - A unique constraint covering the columns `[EMAIL]` on the table `staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `EMAIL_UNIQUE` ON `staff`(`EMAIL`);
