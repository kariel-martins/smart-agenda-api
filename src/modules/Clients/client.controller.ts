import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeClientService } from "./client.factory";

const service = makeClientService();

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
      context: "Clients/client.controller.ts/create",
    });
  }
};

export const getById: RequestHandler = async (req, res) => {
  try {
    const { service_id } = req.params;
    const result = await service.getById(String(service_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getById",
      context: "Clients/client.controller.ts/getById",
    });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const { business_id } = req.params;
    const result = await service.update(String(business_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar update",
      context: "Clients/client.controller.ts/update",
    });
  }
};

export const remove: RequestHandler = async (req, res) => {
  try {
    const { service_id } = req.params;
    const result = await service.delete(String(service_id));

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar remove",
      context: "Clients/client.controller.ts/remove",
    });
  }
};
