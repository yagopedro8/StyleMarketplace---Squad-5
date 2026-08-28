import { PrismaClient } from "../../generated/prisma/client"

const catalog = [
  { name: "Camisa Original", price: 200, discount: 40, photoUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80" },
  { name: "Vestido vermelho", price: 89, discount: 45, photoUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80" },
  { name: "Tenis de corrida", price: 140, discount: 40, photoUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
  { name: "Jaqueta DUNA", price: 110, discount: 38, photoUrl: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80" },
  { name: "Camiseta Slim fit", price: 90, discount: 40, photoUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80" },
  { name: "Bolsa de couro", price: 120, discount: 40, photoUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" },
  { name: "Moletom Oversised", price: 75, discount: 41, photoUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" },
  { name: "Camisa do mengao", price: 95, discount: 39, photoUrl: "/products/camisa-mengao.png" },
  { name: "Relogio basico", price: 160, discount: 41, photoUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80" },
  { name: "Calca Jeans Reta", price: 140, discount: 36, photoUrl: "https://images.unsplash.com/photo-1659167099846-a0dbfc52aa2d?auto=format&fit=crop&w=800&q=80" },
]

export async function catalogSeeder(prisma: PrismaClient, saleId: number) {
  for (const item of catalog) {
    const existing = await prisma.product.findFirst({ where: { name: item.name } })
    if (existing) continue

    const salePrice = Number((item.price * (1 - item.discount / 100)).toFixed(2))

    const product = await prisma.product.create({
      data: {
        name: item.name,
        description: item.name,
        price: item.price,
        salePrice,
        saleId,
        photoUrl: item.photoUrl,
        isOutOfStock: false,
      },
    })

    await prisma.variant.create({
      data: { color: "Único", size: "M", stock: 50, productId: product.id },
    })
  }
}