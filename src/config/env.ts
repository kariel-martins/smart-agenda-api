import dotenv from "dotenv";
import path from "path";
import { AppError } from "../core/errors/AppError";

const nodeEnv = (process.env.NODE_ENV = "development");
const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`);

dotenv.config({ path: envPath });

function getRequireVars(key: string) {
  const val = process.env[key];
  if (!val)
    throw new AppError(
      `Variável de ambiente ${key} não definida`,
      500,
      false,
      "config/env.ts",
    );
  return val;
}

export function env() {
    const reqVars = ["PORT", "DATABASE_URL", "DEBUG", "FRONTEND_URL", "BACKEND_URL"]

    reqVars.forEach((key)=> {
        if (!process.env[key]) {
             throw new AppError(`Variavel de ambiente ${key}`, 500, false, "config/env.ts")
        }
    })

    return {
      port: Number(getRequireVars("PORT")) || 3421,
      database_url: getRequireVars("DATABASE_URL"),
      debug: getRequireVars("DEBUG"),
      frontend_url: getRequireVars("FRONTEND_URL"),
      backend_url: getRequireVars("BACKEND_URL"),
    }

}