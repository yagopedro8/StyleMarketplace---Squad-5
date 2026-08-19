import { Request, Response } from "express";
import prisma from "../config/prisma";

export async function createProduct(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      price,
      salePrice,
      photoUrl,
    } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({
        message: "Preencha os campos obrigatórios.",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        salePrice:
          salePrice !== undefined && salePrice !== null
            ? Number(salePrice)
            : null,
        photoUrl: photoUrl ?? null,
      },
    });

    return res.status(201).json({
      message: "Produto criado com sucesso.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar produto.",
      error,
    });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar produtos.",
      error,
    });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar produto.",
      error,
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const {
      name,
      description,
      price,
      salePrice,
      rating,
      numOfReviews,
      isOutOfStock,
      photoUrl,
    } = req.body;

    const productExists = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },

      data: {
        ...(name !== undefined && { name }),

        ...(description !== undefined && {
          description,
        }),

        ...(price !== undefined && {
          price: Number(price),
        }),

        ...(salePrice !== undefined && {
          salePrice:
            salePrice !== null
              ? Number(salePrice)
              : null,
        }),

        ...(rating !== undefined && {
          rating: Number(rating),
        }),

        ...(numOfReviews !== undefined && {
          numOfReviews: Number(numOfReviews),
        }),

        ...(isOutOfStock !== undefined && {
          isOutOfStock,
        }),

        ...(photoUrl !== undefined && {
          photoUrl,
        }),
      },
    });

    return res.status(200).json({
      message: "Produto atualizado com sucesso.",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar produto.",
      error,
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const productExists = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Produto deletado com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar produto.",
      error,
    });
  }
}