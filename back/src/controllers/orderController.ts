import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function createOrder(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "Usuário é obrigatório.",
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

    const cart = await prisma.cart.findUnique({
      where: {
        userId: Number(userId),
      },
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
    });

    if (!cart) {
      return res.status(404).json({
        message: "Carrinho não encontrado.",
      });
    }

    if (cart.cartVariants.length === 0) {
      return res.status(400).json({
        message: "O carrinho está vazio.",
      });
    }

    const order = await prisma.$transaction(async (tx) => {
      let totalValue = 0;

      for (const cartVariant of cart.cartVariants) {
        const product = cartVariant.variant.product;

        if (!product) {
          throw new Error(
            `Produto da variante ${cartVariant.variantId} não encontrado.`
          );
        }

        if (cartVariant.variant.stock < cartVariant.quantity) {
          throw new Error(
            `Estoque insuficiente para a variante ${cartVariant.variantId}.`
          );
        }

        const unitPrice =
          product.salePrice !== null
            ? product.salePrice
            : product.price;

        totalValue += unitPrice * cartVariant.quantity;
      }

      const createdOrder = await tx.order.create({
        data: {
          status: "PENDING",
          totalValue,
          userId: Number(userId),
        },
      });

      for (const cartVariant of cart.cartVariants) {
        const product = cartVariant.variant.product;

        if (!product) {
          throw new Error(
            `Produto da variante ${cartVariant.variantId} não encontrado.`
          );
        }

        const unitPrice =
          product.salePrice !== null
            ? product.salePrice
            : product.price;

        await tx.orderVariant.create({
          data: {
            quantity: cartVariant.quantity,
            unitPrice,
            orderId: createdOrder.id,
            variantId: cartVariant.variantId,
          },
        });

        await tx.variant.update({
          where: {
            id: cartVariant.variantId,
          },
          data: {
            stock: {
              decrement: cartVariant.quantity,
            },
          },
        });
      }

      await tx.cartVariant.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      return tx.order.findUnique({
        where: {
          id: createdOrder.id,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              gender: true,
              phoneNumber: true,
              dateBirth: true,
              memberSince: true,
              totalOrders: true,
              totalRating: true,
              totalWishlist: true,
            },
          },
          orderVariants: {
            include: {
              variant: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
    });

    return res.status(201).json({
      message: "Pedido criado com sucesso.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar pedido.",
      error:
        error instanceof Error
          ? error.message
          : error,
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

    const { status } = req.body;

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