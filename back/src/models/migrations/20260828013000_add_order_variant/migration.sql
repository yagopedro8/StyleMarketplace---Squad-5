-- AlterTable
ALTER TABLE "Cart"
ADD COLUMN "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Variant"
ADD COLUMN "productId" INTEGER;

-- CreateTable
CREATE TABLE "OrderVariant" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,

    CONSTRAINT "OrderVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key"
ON "Cart"("userId");

-- AddForeignKey
ALTER TABLE "Cart"
ADD CONSTRAINT "Cart_userId_fkey"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant"
ADD CONSTRAINT "Variant_productId_fkey"
FOREIGN KEY ("productId")
REFERENCES "Product"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;

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
