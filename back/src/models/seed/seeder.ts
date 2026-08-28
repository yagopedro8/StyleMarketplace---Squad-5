import prisma from "../../config/prisma"
import { catalogSeeder } from "./catalogSeeder"

async function main() {
  await prisma.cartVariant.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.sale.deleteMany()

  await catalogSeeder(prisma)
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
