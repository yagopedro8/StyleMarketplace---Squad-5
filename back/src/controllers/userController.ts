import { Request, Response } from "express";
import prisma from "../config/prisma";
import auth from "../config/auth";
import Mailer from "../config/mailer";

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

    const { salt, hash } = auth.generatePassword(password);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        hash,
        salt,
        gender: gender ?? null,
        phoneNumber: phoneNumber ?? null,
        dateBirth: dateBirth ? new Date(dateBirth) : null,
      },
    });

    const {
      hash: _hash,
      salt: _salt,
      ...userWithoutPassword
    } = user;

    try {
      await Mailer.sendEmail(
        email,
        "Bem-vindo ao StyleMarketplace!",
        `Olá ${firstName}, seja bem-vindo ao StyleMarketplace!`
      );
    } catch (emailError) {
      console.log(emailError);
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Erro ao criar usuário.",
      error: error instanceof Error ? error.message : error,
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
      where: {
        id,
      },
    });

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    let hash = userExists.hash;
    let salt = userExists.salt;

    if (password) {
      const {
        hash: newHash,
        salt: newSalt,
      } = auth.generatePassword(password);

      hash = newHash;
      salt = newSalt;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        hash,
        salt,
        gender,
        phoneNumber,
        ...(dateBirth && {
          dateBirth: new Date(dateBirth),
        }),
      },
    });

    const {
      hash: _hash,
      salt: _salt,
      ...userWithoutPassword
    } = updatedUser;

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
      where: {
        id,
      },
    });

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado.",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
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

export async function login(req: Request, res: Response) {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email ou senha incorretos.",
      });
    }

    const passwordIsValid = auth.checkPassword(
      password,
      user.hash,
      user.salt
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Email ou senha incorretos.",
      });
    }

    const token = auth.generateJWT(
      user.id.toString()
    );

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao realizar login.",
      error,
    });
  }
}