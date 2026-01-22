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
      message: "Erro ao processar createUsers",
      context: "users/users.controller.ts/createUsers",
    });
  }
};

export const login = () => {

}

export const refresh = () => {

}

export const forgoutPassword = () => {

}
export const resetPassword = () => {

} 

export const logout = () => {

}