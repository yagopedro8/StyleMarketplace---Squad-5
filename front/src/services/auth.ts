import { api } from "./api"

type LoginResponse = {
  message: string
  token: string
}

type RegisterResponse = {
  message: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
}

export async function login(email: string, password: string) {
  const response = await api.post<LoginResponse>("/login", { email, password })
  return response.data
}

export async function register(data: {
  firstName: string
  lastName: string
  email: string
  password: string
}) {
  const response = await api.post<RegisterResponse>("/users", data)
  return response.data
}