import { NextFunction, Request, Response } from "express";
import auth from "../config/auth";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não informado.",
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({
      message: "Token inválido.",
    });
  }

  const decodedToken = auth.decodeJWT(token);

  if (!decodedToken) {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }

  next();
} 