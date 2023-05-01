-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followedById" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
