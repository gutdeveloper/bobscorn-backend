-- CreateTable
CREATE TABLE "PurchasedCorn" (
    "id" SERIAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "last_purchase" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchasedCorn_pkey" PRIMARY KEY ("id")
);
