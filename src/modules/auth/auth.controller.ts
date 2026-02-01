import { RequestHandler } from "express";
import { makeAuthService } from "./auth.factory";
import { AppError } from "../../core/errors/AppError";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const service = makeAuthService();
    const result = await service.registerUser(req.body);

    res.cookie("businessId", result.businessData.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.cookie("refreshToken", result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 48, // 2 dias
      path: "/",
    });

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 15, // 15 minutos
      path: "/",
    });

    return res.status(201).json({
      usersData: result.usersData,
      businessData: result.businessData,
    });

  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};


export const login: RequestHandler = async (req, res) => {
  try {
    const service = makeAuthService();
    const result = await service.login(req.body);

    res.cookie("businessId", result.businessData.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.cookie("refreshToken", result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 48, // 2 dias
      path: "/",
    });

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 15, // 15 minutos
      path: "/",
    });

    return res
      .status(200)
      .json({ usersData: result.usersData, businessData: result.businessData });
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
    const service = makeAuthService();
    const refresh_token = req.cookies.refreshToken;

    const result = await service.refresh(refresh_token);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 48, // 2 dias
      path: "/",
    });

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 15, // 15 minutos
      path: "/",
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
    const service = makeAuthService();
    const { email } = req.body;
    const result = await service.forgotPassword(email);

    res.cookie("forgotPassword", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 15, // 15 minutos
      path: "/",
    });

    return res.status(200).json(result.message);
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
    const service = makeAuthService();
    const token = req.cookies.forgotPassword;
    const data = req.body;
    const result = await service.resetPassword(token, data);

    return res.status(200).json(result);
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
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 48, // 2 dias
      path: "/",
    });

    return res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (error) {
    console.error("Erro ao remover autenticação:", error);
    return res.status(500).json({
      message: "Erro ao processar logout",
      context: "auth/auth.controller.ts/logout",
    });
  }
};
