import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function createWishlist(req: Request, res: Response) {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "Usuário e produto são obrigatórios.",
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

    const productExists = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!productExists) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    const wishlistExists = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: Number(userId),
          productId: Number(productId),
        },
      },
    });

    if (wishlistExists) {
      return res.status(400).json({
        message: "Produto já está na wishlist.",
      });
    }

    const wishlist = await prisma.wishlist.create({
      data: {
        userId: Number(userId),
        productId: Number(productId),
      },
    });

    return res.status(201).json({
      message: "Produto adicionado à wishlist.",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao adicionar produto à wishlist.",
      error,
    });
  }
}

export async function getWishlists(req: Request, res: Response) {
  try {
    const wishlists = await prisma.wishlist.findMany({
      include: {
        user: true,
        product: true,
      },
    });

    return res.status(200).json(wishlists);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar wishlists.",
      error,
    });
  }
}

export async function getWishlistById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const wishlist = await prisma.wishlist.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        product: true,
      },
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist não encontrada.",
      });
    }

    return res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar wishlist.",
      error,
    });
  }
}

export async function updateWishlist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { userId, productId } = req.body;

    const wishlistExists = await prisma.wishlist.findUnique({
      where: {
        id,
      },
    });

    if (!wishlistExists) {
      return res.status(404).json({
        message: "Wishlist não encontrada.",
      });
    }

    const updatedWishlist = await prisma.wishlist.update({
      where: {
        id,
      },
      data: {
        ...(userId !== undefined && {
          userId: Number(userId),
        }),

        ...(productId !== undefined && {
          productId: Number(productId),
        }),
      },
    });

    return res.status(200).json({
      message: "Wishlist atualizada com sucesso.",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar wishlist.",
      error,
    });
  }
}

export async function deleteWishlist(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const wishlistExists = await prisma.wishlist.findUnique({
      where: {
        id,
      },
    });

    if (!wishlistExists) {
      return res.status(404).json({
        message: "Wishlist não encontrada.",
      });
    }

    await prisma.wishlist.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Produto removido da wishlist.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao remover produto da wishlist.",
      error,
    });
  }
}