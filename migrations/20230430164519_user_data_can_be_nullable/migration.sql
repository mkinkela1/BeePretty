-- AlterTable
ALTER TABLE "UserData" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "profilePic" DROP NOT NULL;
