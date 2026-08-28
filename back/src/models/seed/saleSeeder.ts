import { PrismaClient } from "../../generated/prisma/client"

export async function saleSeeder(prisma: PrismaClient) {
  return prisma.sale.create({
    data: {
      name: "Promoção StyleMarketplace",
      discount: 40,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })
}