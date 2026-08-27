import { api } from "./api"

export type Cart = {
  id: number
  promoCode: string | null
  updateAt: string
  userId: number
}

export async function getCarts() {
  const response = await api.get<Cart[]>("/carts")
  return response.data
}

export async function createCart(userId: number) {
  const response = await api.post<Cart>("/carts", { userId })
  return response.data
}