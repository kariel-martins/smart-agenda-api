import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeBusinessService } from "./business.factory";

const service = makeBusinessService();

export const getById: RequestHandler = async (req, res) => {
  try {
    const businessId = req.cookies.businessId;
    const result = await service.getById(businessId);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getById",
      context: "Business/business.controller.ts/getById",
    });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const businessId = req.cookies.businessId;
    const result = await service.update(businessId, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar update",
      context: "Business/business.controller.ts/update",
    });
  }
};
