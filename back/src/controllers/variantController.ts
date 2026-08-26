import { Request, Response } from 'express'
import prisma from '../config/prisma'

export const criarVariant = async (req: Request, res: Response) => {
  try {
    const { color, size, stock, productId } = req.body
    const variant = await prisma.variant.create({
      data: {
        color,
        size,
        stock: Number(stock),
        productId: Number(productId),
      },
    })
    return res.status(201).json(variant)
  } catch (e) {
    return res.status(400).json({ erro: 'Erro ao criar variant', detalhe: String(e) })
  }
}

export const listarVariants = async (_req: Request, res: Response) => {
  const variants = await prisma.variant.findMany()
  return res.json(variants)
}

export const buscarVariant = async (req: Request, res: Response) => {
  const variant = await prisma.variant.findUnique({
    where: { id: Number(req.params.id) },
  })
  if (!variant) return res.status(404).json({ erro: 'Variant não encontrada' })
  return res.json(variant)
}

export const atualizarVariant = async (req: Request, res: Response) => {
  try {
    const { color, size, stock } = req.body
    const data: any = {}
    if (color !== undefined) data.color = color
    if (size !== undefined) data.size = size
    if (stock !== undefined) data.stock = Number(stock)

    const variant = await prisma.variant.update({
      where: { id: Number(req.params.id) },
      data,
    })
    return res.json(variant)
  } catch (e) {
    return res.status(404).json({ erro: 'Variant não encontrada' })
  }
}

export const deletarVariant = async (req: Request, res: Response) => {
  try {
    await prisma.variant.delete({ where: { id: Number(req.params.id) } })
    return res.status(204).send()
  } catch (e) {
    return res.status(404).json({ erro: 'Variant não encontrada' })
  }
}