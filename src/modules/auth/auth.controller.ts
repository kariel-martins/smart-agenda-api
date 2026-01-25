import { RequestHandler } from "express";
import { makeAuthService } from "./auth.factory";
import { AppError } from "../../core/errors/AppError";

const service = makeAuthService();

export const createUser: RequestHandler = async (req, res) => {
  try {
    const result = await service.RegisterUser(req.body);

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar createUser",
      context: "auth/auth.controller.ts/createUser",
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const result = await service.login(req.body);

    res.cookie("refreshToken", result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 48, // 2 dias
      path: "/auth/refresh",
    });

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 15, // 15 minutos
      path: "/auth/verify",
    });

    return res.status(200).json(result.users);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar login",
      context: "auth/auth.controller.ts/login",
    });
  }
};

export const refresh: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { user_id } = req.params as { user_id: string };

    if (!refreshToken) throw new AppError("Refresh token não encontrado!");
    const result = await service.refresh(refreshToken, user_id);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 48, // 2 dias
      path: "/auth/refresh",
    });

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 15, // 15 minutos
      path: "/auth/verify",
    });

    return res.status(200).json({ message: "Validação bem sucedida!" });
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar refresh",
      context: "auth/auth.controller.ts/refresh",
    });
  }
};

export const forgotPassword: RequestHandler = async (req, res) => {
  try {
    const result = await service.forgotPassword(req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar forgoutPassword",
      context: "auth/auth.controller.ts/forgoutPassword",
    });
  }
};
export const resetPassword: RequestHandler = async (req, res) => {
  try {
    const { token } = req.params as { token: string };
    const data = req.body;
    const result = await service.resetPassword(token, data);

    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar resetPassword",
      context: "auth/auth.controller.ts/resetPassword",
    });
  }
};

export const logout: RequestHandler = (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 15, // 15 minutos
      path: "/auth/verify",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 48, // 2 dias
      path: "/auth/refresh",
    });

    return res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    console.error("Erro ao remover autenticação:", error);
    return res.status(500).json({
      message: "Erro ao processar logout",
      context:
        "auth/auth.controller.ts/logout",
    });
  }
};
