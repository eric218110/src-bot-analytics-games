/*
  Warnings:

  - You are about to drop the `games` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "games";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "gameDouble" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "gameCrash" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "crashedIn" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
