-- CreateTable
CREATE TABLE "FeaturedImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FeaturedImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedImage_userId_key" ON "FeaturedImage"("userId");

-- AddForeignKey
ALTER TABLE "FeaturedImage" ADD CONSTRAINT "FeaturedImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
