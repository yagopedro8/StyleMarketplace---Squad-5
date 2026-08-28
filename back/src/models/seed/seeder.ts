import prisma from "../../config/prisma"
import { saleSeeder } from "./saleSeeder"
import { productSeeder } from "./productSeeder"
import { variantSeeder } from "./variantSeeder"

async function main() {
  const productCount = await prisma.product.count()

  if (productCount >= 15) {
    console.log("Seed já parece ter rodado antes, ignorado.")
    return
  }

  const sales = await saleSeeder(prisma, 3)
  const products = await productSeeder(
    prisma,
    15,
    sales.map((sale) => sale.id)
  )
  await variantSeeder(
    prisma,
    products.map((product) => product.id),
    3
  )

  console.log(
    `Seed concluído: ${sales.length} sales, ${products.length} produtos.`
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
