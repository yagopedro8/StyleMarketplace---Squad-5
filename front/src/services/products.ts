import { api } from "./api"
import type { Product } from "../data/products"

// Formato exato que o backend devolve
export type BackendProduct = {
  id: number
  name: string
  description: string
  price: number
  salePrice: number | null
  photoUrl: string | null
}


function adaptProduct(backendProduct: BackendProduct): Product {
  const hasDiscount = backendProduct.salePrice !== null
  const finalPrice = hasDiscount ? backendProduct.salePrice! : backendProduct.price
  const oldPrice = backendProduct.price
  const discount = hasDiscount
    ? Math.round(((oldPrice - finalPrice) / oldPrice) * 100)
    : 0

  return {
    id: backendProduct.id,
    name: backendProduct.name,
    category: "Tops",
    price: finalPrice,
    oldPrice: oldPrice,
    discount: discount,
    rating: 4.5,
    reviews: 0,
    badge: "New",
    image: backendProduct.photoUrl ?? "",
  }
}

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<BackendProduct[]>("/products")
  return response.data.map(adaptProduct)
}

export async function getProductById(id: number): Promise<Product> {
  const response = await api.get<BackendProduct>(`/products/${id}`)
  return adaptProduct(response.data)
}

