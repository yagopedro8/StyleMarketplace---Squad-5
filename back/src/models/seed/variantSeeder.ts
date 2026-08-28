import { fakerPT_BR } from "@faker-js/faker"
import { PrismaClient } from "../../generated/prisma/client"

const colors = ["Preto", "Branco", "Azul", "Vermelho", "Verde", "Cinza"]
const sizes = ["PP", "P", "M", "G", "GG"]

export async function variantSeeder(
  prisma: PrismaClient,
  productIds: number[],
  variantsPerProduct: number
) {
  for (const productId of productIds) {
    for (let i = 0; i < variantsPerProduct; i++) {
      await prisma.variant.create({
        data: {
          color: fakerPT_BR.helpers.arrayElement(colors),
          size: fakerPT_BR.helpers.arrayElement(sizes),
          stock: fakerPT_BR.number.int({ min: 0, max: 50 }),
          productId,
        },
      })
    }
  }
}
