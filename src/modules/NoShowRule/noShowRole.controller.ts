import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeNoShowRoleService } from "./noShowRole.factory";

const NoShowRole = makeNoShowRoleService()

export const create: RequestHandler = async (req, res) => {
  try {
    const result = await NoShowRole.create(req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar create",
      context: "NoShowRole/noShowRole.controller.ts/create",
    });
  }
};

export const getById: RequestHandler = async (req, res) => {
  try {
    const { NoShowRole_id } = req.params
    const result = await NoShowRole.getById(Number(NoShowRole_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getById",
      context: "NoShowRole/noShowRole.controller.ts/getById",
    });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const { business_id } = req.params
    const result = await NoShowRole.update(Number(business_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar update",
      context: "NoShowRole/noShowRole.controller.ts/update",
    });
  }
};


export const remove: RequestHandler = async (req, res) => {
  try {
    const { NoShowRole_id } = req.params
    const result = await NoShowRole.delete(Number(NoShowRole_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar remove",
      context: "NoShowRole/noShowRole.controller.ts/remove",
    });
  }
};
