-- CreateTable
CREATE TABLE "TokenUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "limit" INTEGER NOT NULL DEFAULT 5000000,
    "limitFrequency" TEXT NOT NULL DEFAULT 'day',
    "tokensUsed" INTEGER NOT NULL DEFAULT 0,
    "usageResetsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenUser_ipAddress_key" ON "TokenUser"("ipAddress");
