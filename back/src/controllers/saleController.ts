import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function createSale(req: Request, res: Response) {
  try {
    const {
      name,
      discount,
      startDate,
      endDate,
    } = req.body;

    if (
      !name ||
      discount === undefined ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message: "Preencha os campos obrigatórios.",
      });
    }

    const sale = await prisma.sale.create({
      data: {
        name,
        discount: Number(discount),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return res.status(201).json({
      message: "Promoção criada com sucesso.",
      sale,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar promoção.",
      error,
    });
  }
}

export async function getSales(req: Request, res: Response) {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        products: true,
      },
    });

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar promoções.",
      error,
    });
  }
}

export async function getSaleById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const sale = await prisma.sale.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!sale) {
      return res.status(404).json({
        message: "Promoção não encontrada.",
      });
    }

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar promoção.",
      error,
    });
  }
}

export async function updateSale(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const {
      name,
      discount,
      startDate,
      endDate,
    } = req.body;

    const saleExists = await prisma.sale.findUnique({
      where: {
        id,
      },
    });

    if (!saleExists) {
      return res.status(404).json({
        message: "Promoção não encontrada.",
      });
    }

    const updatedSale = await prisma.sale.update({
      where: {
        id,
      },
      data: {
        ...(name !== undefined && {
          name,
        }),

        ...(discount !== undefined && {
          discount: Number(discount),
        }),

        ...(startDate !== undefined && {
          startDate: new Date(startDate),
        }),

        ...(endDate !== undefined && {
          endDate: new Date(endDate),
        }),
      },
    });

    return res.status(200).json({
      message: "Promoção atualizada com sucesso.",
      sale: updatedSale,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar promoção.",
      error,
    });
  }
}

export async function deleteSale(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const saleExists = await prisma.sale.findUnique({
      where: {
        id,
      },
    });

    if (!saleExists) {
      return res.status(404).json({
        message: "Promoção não encontrada.",
      });
    }

    await prisma.sale.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Promoção deletada com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar promoção.",
      error,
    });
  }
}