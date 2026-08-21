import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function createOrder(req: Request, res: Response) {
  try {
    const {
      status,
      totalValue,
      userId,
    } = req.body;

    if (!status || totalValue === undefined || !userId) {
      return res.status(400).json({
        message: "Preencha os campos obrigatórios.",
      });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    const order = await prisma.order.create({
      data: {
        status,
        totalValue: Number(totalValue),
        userId: Number(userId),
      },
    });

    return res.status(201).json({
      message: "Pedido criado com sucesso.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar pedido.",
      error,
    });
  }
}

export async function getOrders(req: Request, res: Response) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar pedidos.",
      error,
    });
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Pedido não encontrado.",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar pedido.",
      error,
    });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const {
      status,
      totalValue,
    } = req.body;

    const orderExists = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!orderExists) {
      return res.status(404).json({
        message: "Pedido não encontrado.",
      });
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        ...(status !== undefined && {
          status,
        }),
        ...(totalValue !== undefined && {
          totalValue: Number(totalValue),
        }),
      },
    });

    return res.status(200).json({
      message: "Pedido atualizado com sucesso.",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar pedido.",
      error,
    });
  }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const orderExists = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!orderExists) {
      return res.status(404).json({
        message: "Pedido não encontrado.",
      });
    }

    await prisma.order.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Pedido deletado com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar pedido.",
      error,
    });
  }
}