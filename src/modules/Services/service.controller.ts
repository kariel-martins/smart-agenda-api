import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeServiceService } from "./service.factory";

const service = makeServiceService()

export const create: RequestHandler = async (req, res) => {
  try {
    const result = await service.create(req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar create",
      context: "Service/service.controller.ts/create",
    });
  }
};

export const getById: RequestHandler = async (req, res) => {
  try {
    const { service_id } = req.params
    const result = await service.getById(Number(service_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getById",
      context: "Service/service.controller.ts/getById",
    });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const { business_id } = req.params
    const result = await service.update(Number(business_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar update",
      context: "Service/service.controller.ts/update",
    });
  }
};


export const remove: RequestHandler = async (req, res) => {
  try {
    const { service_id } = req.params
    const result = await service.delete(Number(service_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar remove",
      context: "Service/service.controller.ts/remove",
    });
  }
};
