import { api } from "./api"

export type Cart = {
  id: number
  promoCode: string | null
  updateAt: string
  userId: number
}

export type CartDetail = Cart & {
  cartVariants: {
    id: number
    cartId: number
    variantId: number
    quantity: number
    variant: {
      id: number
      color: string
      size: string
      stock: number
      product: {
        id: number
        name: string
        price: number
        salePrice: number | null
        photoUrl: string | null
      }
    }
  }[]
}

export async function getCarts() {
  const response = await api.get<Cart[]>("/carts")
  return response.data
}

export async function createCart(userId: number) {
  const response = await api.post<Cart>("/carts", { userId })
  return response.data
}

export async function getCartById(id: number) {
  const response = await api.get<CartDetail>(`/carts/${id}`)
  return response.data
}

export async function addCartVariant(
  cartId: number,
  variantId: number,
  quantity: number
) {
  const response = await api.post("/cart-variants", {
    cartId,
    variantId,
    quantity,
  })
  return response.data
}

export async function updateCartVariant(id: number, quantity: number) {
  const response = await api.put(`/cart-variants/${id}`, { quantity })
  return response.data
}

export async function removeCartVariant(id: number) {
  await api.delete(`/cart-variants/${id}`)
}

export async function createOrder(userId: number) {
  const token = localStorage.getItem("token")
  const response = await api.post(
    "/orders",
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  )
 return response.data
}
