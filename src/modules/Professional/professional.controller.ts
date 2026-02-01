import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeProfessionalService } from "./professional.factory";

const service = makeProfessionalService()

export const create: RequestHandler = async (req, res) => {
  try {
    const businessId = req.cookies.businessId
    const result = await service.create(businessId, req.body);

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar create",
      context: "Professional/professional.controller.ts/create",
    });
  }
};

export const getById: RequestHandler = async (req, res) => {
  try {
    const businessId = req.cookies.businessId
    const result = await service.getByIdBusiness(businessId);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getById",
      context: "Professional/professional.controller.ts/getById",
    });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const { professional_id } = req.params
    const result = await service.update(Number(professional_id), req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar update",
      context: "Professional/professional.controller.ts/update",
    });
  }
};


export const remove: RequestHandler = async (req, res) => {
  try {
    const { professional_id } = req.params
    const result = await service.delete(Number(professional_id));

    return res.status(204).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar remove",
      context: "Professional/professional.controller.ts/remove",
    });
  }
};
