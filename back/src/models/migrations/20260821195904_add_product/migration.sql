-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "numOfReviews" INTEGER NOT NULL DEFAULT 0,
    "isOutOfStock" BOOLEAN NOT NULL DEFAULT false,
    "photoUrl" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
