-- AlterTable
ALTER TABLE "Product" ADD COLUMN "saleId" INTEGER;

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product"
ADD CONSTRAINT "Product_saleId_fkey"
FOREIGN KEY ("saleId")
REFERENCES "Sale"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;