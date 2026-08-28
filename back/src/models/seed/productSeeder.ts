import { fakerPT_BR } from "@faker-js/faker"
import { PrismaClient } from "../../generated/prisma/client"

export async function productSeeder(
  prisma: PrismaClient,
  numProducts: number,
  saleIds: number[]
) {
  const products = []

  for (let i = 0; i < numProducts; i++) {
    const price = Number(fakerPT_BR.commerce.price({ min: 30, max: 500 }))
    const hasSale = saleIds.length > 0 && fakerPT_BR.datatype.boolean()

    const product = await prisma.product.create({
      data: {
        name: fakerPT_BR.commerce.productName(),
        description: fakerPT_BR.commerce.productDescription(),
        price,
        salePrice: hasSale ? Number((price * 0.8).toFixed(2)) : null,
        rating: fakerPT_BR.number.float({ min: 0, max: 5, fractionDigits: 1 }),
        numOfReviews: fakerPT_BR.number.int({ min: 0, max: 300 }),
        isOutOfStock: false,
        photoUrl: fakerPT_BR.image.urlPicsumPhotos(),
        saleId: hasSale ? fakerPT_BR.helpers.arrayElement(saleIds) : null,
      },
    })

    products.push(product)
  }

  return products
}
