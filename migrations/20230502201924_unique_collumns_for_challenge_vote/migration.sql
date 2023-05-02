/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `ChallengeVote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ChallengeVote_userId_challengeId_key" ON "ChallengeVote"("userId", "challengeId");
