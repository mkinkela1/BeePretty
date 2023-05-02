/*
  Warnings:

  - The primary key for the `Challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[challengedById,challengerId]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ChallengeVote" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "voteForId" INTEGER NOT NULL,

    CONSTRAINT "ChallengeVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_challengedById_challengerId_key" ON "Challenge"("challengedById", "challengerId");

-- AddForeignKey
ALTER TABLE "ChallengeVote" ADD CONSTRAINT "ChallengeVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeVote" ADD CONSTRAINT "ChallengeVote_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
