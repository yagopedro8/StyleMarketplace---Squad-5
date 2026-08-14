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

    return res.status(201).json({
      message: "Usuário criado com sucesso.",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar usuário.",
      error,
    });
  }
}