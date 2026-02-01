import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { env } from "../../config/env";

const { debug } = env();
const DEBUG = debug === "true";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {

  // Erros conhecidos da aplicação
  if (err instanceof AppError) {

    console.error(
      `[APP ERROR] ${err.context ?? "APP"} -> ${err.message}`
    );

    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Erros inesperados
  console.error(
    `[UNEXPECTED ERROR] ${err.message}`,
    DEBUG ? err.stack : ""
  );

  return res.status(500).json({
    status: "error",
    message: "Erro interno no servidor",
  });
}
