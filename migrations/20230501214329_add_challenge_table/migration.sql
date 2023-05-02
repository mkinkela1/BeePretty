-- CreateTable
CREATE TABLE "Challenge" (
    "challengedById" INTEGER NOT NULL,
    "challengerId" INTEGER NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("challengedById","challengerId")
);

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengedById_fkey" FOREIGN KEY ("challengedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
