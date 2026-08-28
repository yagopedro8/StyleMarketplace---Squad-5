import { PrismaClient } from "../../generated/prisma/client"

const catalog = [
  { name: "Camisa Original", price: 120 },
  { name: "Vestido vermelho", price: 49 },
  { name: "Tenis de corrida", price: 84 },
  { name: "Jaqueta DUNA", price: 68 },
  { name: "Camiseta Slim fit", price: 54 },
  { name: "Bolsa de couro", price: 72 },
  { name: "Moletom Oversised", price: 44 },
  { name: "Camisa do mengao", price: 58 },
  { name: "Relogio basico", price: 95 },
  { name: "Calca Jeans Reta", price: 89 },
]

export async function catalogSeeder(prisma: PrismaClient) {
  for (const item of catalog) {
    const existing = await prisma.product.findFirst({
      where: { name: item.name },
    })

    if (existing) continue

    const product = await prisma.product.create({
      data: {
        name: item.name,
        description: item.name,
        price: item.price,
        isOutOfStock: false,
      },
    })

    await prisma.variant.create({
      data: {
        color: "Único",
        size: "M",
        stock: 50,
        productId: product.id,
      },
    })
  }
}
