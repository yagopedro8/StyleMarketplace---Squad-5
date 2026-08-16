import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";

export async function createUser(req: Request, res: Response) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      dateBirth,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Preencha os campos obrigatórios.",
      });
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        message: "Usuário já cadastrado com esse e-mail.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        phoneNumber,
        dateBirth: dateBirth ? new Date(dateBirth) : null,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar usuário.",
      error,
    });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
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
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuários.",
      error,
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
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
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuário.",
      error,
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      dateBirth,
    } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    let hashedPassword = userExists.password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      phoneNumber,
        ...(dateBirth && {
          dateBirth: new Date(dateBirth),
        }),
  },
});

    const { password: _, ...userWithoutPassword } = updatedUser;

    return res.status(200).json({
      message: "Usuário atualizado com sucesso.",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar usuário.",
      error,
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Usuário deletado com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar usuário.",
      error,
    });
  }
}