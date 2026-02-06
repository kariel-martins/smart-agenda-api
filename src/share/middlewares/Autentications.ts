import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/JWTService";
import { env } from "../../config/env";
import { AppError } from "../../core/errors/AppError";

type Roles = "admin" | "manager" | "staff";

export const Authorization = (allowedRoles: Roles[]) => {
 return async function authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const jwt = new JwtService(env().jwtKey);
      const accessToken = req.cookies.accessToken;

      if (!accessToken) throw new AppError("Não autorizado!", 401);

      const payload = await jwt.verify(accessToken);

      if (
        !payload ||
        !payload.sub ||
        !payload.scope ||
        !payload.role ||
        payload.purpose !== "ACCESS_TOKEN"
      ) {
        throw new AppError("Token ausente ou inválido!", 401);
      }

      if (!allowedRoles.includes(payload.role as Roles)) {
        throw new AppError("Acesso negado!", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}