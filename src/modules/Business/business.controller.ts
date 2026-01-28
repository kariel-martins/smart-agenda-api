import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeBusinessService } from "./business.factory";

const service = makeBusinessService();

export const get: RequestHandler = async (req, res) => {
  try {
    const { business_id } = req.params as { business_id: string };
    const result = await service.getById(business_id);

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
    const { business_id } = req.params as { business_id: string };
    const result = await service.update(business_id, req.body);

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
