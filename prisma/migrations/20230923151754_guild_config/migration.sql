-- CreateTable
CREATE TABLE "Config" (
    "guildId" TEXT NOT NULL,
    "logChannel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_guildId_key" ON "Config"("guildId");

-- AddForeignKey
ALTER TABLE "Config" ADD CONSTRAINT "Config_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
