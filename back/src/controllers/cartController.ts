import { Request, Response } from 'express'
import prisma from '../config/prisma'

export const criarCart = async (req: Request, res: Response) => {
  try {
    const { promoCode, userId } = req.body
    const cart = await prisma.cart.create({
      data: {
        promoCode,
        userId: Number(userId),
      },
    })
    return res.status(201).json(cart)
  } catch (e) {
    return res.status(400).json({ erro: 'Erro ao criar carrinho', detalhe: String(e) })
  }
}

export const listarCarts = async (_req: Request, res: Response) => {
    const carts = await prisma.cart.findMany()
    return res.json(carts)
}

export const buscarCart = async (req: Request, res: Response) => {
  const cart = await prisma.cart.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      cartVariants: {
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })
  if (!cart) return res.status(404).json({ erro: "Cart não encontrado" })
  return res.json(cart)
}

export const atualizarCart = async (req: Request, res: Response) => {
  try {
    const { promoCode } = req.body
    const data: any = {}
    if (promoCode !== undefined) data.promoCode = promoCode

    const cart = await prisma.cart.update({
      where: { id: Number(req.params.id) },
      data,
    })
    return res.json(cart)
  } catch (e) {
    return res.status(404).json({ erro: 'Cart não encontrado' })
  }
}

export const deletarCart = async (req: Request, res: Response) => {
  try {
    await prisma.cart.delete({ where: { id: Number(req.params.id) } })
    return res.status(204).send()
  } catch (e) {
    return res.status(404).json({ erro: 'Cart não encontrado' })
  }
}

export const getCarts = async (req: Request, res: Response) => {
  try {
    const carts = await prisma.cart.findMany(); 
    return res.status(200).json(carts);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar carrinhos" });
  }
};