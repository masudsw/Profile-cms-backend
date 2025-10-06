/*
  Warnings:

  - You are about to drop the column `content` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Project` table. All the data in the column will be lost.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `features` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `livesite` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectlink` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "content",
DROP COLUMN "isFeatured",
DROP COLUMN "tags",
DROP COLUMN "title",
DROP COLUMN "views",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "features" TEXT NOT NULL,
ADD COLUMN     "livesite" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "projectlink" TEXT NOT NULL;
