-- CreateTable
CREATE TABLE "MySite" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "eye" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "socialWpp" TEXT NOT NULL,

    CONSTRAINT "MySite_pkey" PRIMARY KEY ("id")
);
