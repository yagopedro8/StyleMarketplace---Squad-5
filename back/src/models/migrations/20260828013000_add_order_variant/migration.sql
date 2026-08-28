-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "productId" DROP NOT NULL;

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- AddForeignKey
ALTER TABLE "Variant"
ADD CONSTRAINT "Variant_productId_fkey"
FOREIGN KEY ("productId")
REFERENCES "Product"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "OrderVariant" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,

    CONSTRAINT "OrderVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderVariant"
ADD CONSTRAINT "OrderVariant_orderId_fkey"
FOREIGN KEY ("orderId")
REFERENCES "Order"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderVariant"
ADD CONSTRAINT "OrderVariant_variantId_fkey"
FOREIGN KEY ("variantId")
REFERENCES "Variant"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;
