import { api } from "./api"

export type BackendProduct = {
  id: number
  name: string
}

export type BackendVariant = {
  id: number
  productId: number
}

export async function getBackendProducts() {
  const response = await api.get<BackendProduct[]>("/products")
  return response.data
}

export async function getBackendVariants() {
  const response = await api.get<BackendVariant[]>("/variants")
  return response.data
}
