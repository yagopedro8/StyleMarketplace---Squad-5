import prisma from "../../config/prisma"
import { saleSeeder } from "./saleSeeder"
import { catalogSeeder } from "./catalogSeeder"

async function main() {
  await prisma.orderVariant.deleteMany()
  await prisma.cartVariant.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.sale.deleteMany()

  const sale = await saleSeeder(prisma)
  await catalogSeeder(prisma, sale.id)

  console.log("Seed concluído.")
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
