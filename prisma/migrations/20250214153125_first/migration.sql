-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "currentwaterlevel" INTEGER NOT NULL,
    "timeleft" INTEGER,
    "isactive" BOOLEAN NOT NULL DEFAULT false,
    "estimatedfilltime" TIMESTAMP(6) NOT NULL,
    "lastupdatetime" TIMESTAMP(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
