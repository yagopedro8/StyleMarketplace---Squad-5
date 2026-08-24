import { Request, Response } from 'express'
import prisma from '../config/prisma'

export const criarCartVariant = async (req: Request, res: Response) => {
  try {
    const { cartId, variantId, quantity } = req.body
    const cartVariant = await prisma.cartVariant.create({
      data: {
        cartId: Number(cartId),
        variantId: Number(variantId),
        quantity: Number(quantity),
      },
    })
    return res.status(201).json(cartVariant)
  } catch (e) {
    return res.status(400).json({ erro: 'Erro ao criar item do carrinho', detalhe: String(e) })
  }
}

export const listarCartVariants = async (_req: Request, res: Response) => {
  const cartVariants = await prisma.cartVariant.findMany()
  return res.json(cartVariants)
}

export const buscarCartVariant = async (req: Request, res: Response) => {
  const cartVariant = await prisma.cartVariant.findUnique({
    where: { id: Number(req.params.id) },
  })
  if (!cartVariant) return res.status(404).json({ erro: 'Item do carrinho não encontrado' })
  return res.json(cartVariant)
}

export const atualizarCartVariant = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body
    const data: any = {}
    if (quantity !== undefined) data.quantity = Number(quantity)

    const cartVariant = await prisma.cartVariant.update({
      where: { id: Number(req.params.id) },
      data,
    })
    return res.json(cartVariant)
  } catch (e) {
    return res.status(404).json({ erro: 'Item do carrinho não encontrado' })
  }
}

export const deletarCartVariant = async (req: Request, res: Response) => {
  try {
    await prisma.cartVariant.delete({
      where: { id: Number(req.params.id) },
    })
    return res.status(204).send()
  } catch (e) {
    return res.status(404).json({ erro: 'Item do carrinho não encontrado' })
  }
}