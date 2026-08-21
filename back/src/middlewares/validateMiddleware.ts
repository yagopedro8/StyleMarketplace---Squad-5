import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validate(schema: z.ZodType) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos.",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    next();
  };
}