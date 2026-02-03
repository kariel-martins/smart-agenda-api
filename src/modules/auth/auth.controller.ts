import { RequestHandler } from "express";
import { makeAuthService } from "./auth.factory";

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


export const login: RequestHandler = async (req, res, next) => {
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
    if (res.headersSent) return
    return next(error);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
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
  }catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const forgotPassword: RequestHandler = async (req, res, next) => {
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

    return res.status(200).json({message: result.message});
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const service = makeAuthService();
    const token = req.cookies.forgotPassword;
    const data = req.body;
    const result = await service.resetPassword(token, data);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const logout: RequestHandler = (_req, res, next) => {
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
    if (res.headersSent) return
    return next(error);
  }
};
