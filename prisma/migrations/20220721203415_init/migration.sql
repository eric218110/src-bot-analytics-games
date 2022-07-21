-- CreateTable
CREATE TABLE "gameDouble" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gameDouble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameCrash" (
    "id" SERIAL NOT NULL,
    "crashedIn" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gameCrash_pkey" PRIMARY KEY ("id")
);
