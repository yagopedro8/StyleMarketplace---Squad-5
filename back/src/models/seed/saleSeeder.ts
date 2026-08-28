import { fakerPT_BR } from "@faker-js/faker"
import { PrismaClient } from "../../generated/prisma/client"

export async function saleSeeder(prisma: PrismaClient, numSales: number) {
  const sales = []

  for (let i = 0; i < numSales; i++) {
    const startDate = fakerPT_BR.date.recent()

    const sale = await prisma.sale.create({
      data: {
        name: `${fakerPT_BR.commerce.department()} Sale`,
        discount: fakerPT_BR.number.int({ min: 5, max: 50 }),
        startDate,
        endDate: fakerPT_BR.date.future({ refDate: startDate }),
      },
    })

    sales.push(sale)
  }

  return sales
}
