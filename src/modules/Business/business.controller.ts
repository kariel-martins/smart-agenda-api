import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeBusinessService } from "./business.factory";

const service = makeBusinessService()
export const create: RequestHandler = async (req, res) => {
    try {
        const result = await service.create(req.body)

        return res.status(201).json(result)
    } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar create",
      context: "Business/business.controller.ts/create",
    });
  }
} 

export const getById: RequestHandler = async (req, res) => {
    try {
        const { business_id } = req.params as { business_id: string}
        const result = await service.getById( business_id )

        return res.status(200).json(result)
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
} 

export const getAll: RequestHandler = async (_req, res) => {
    try {
        const result = await service.getAll()

        return res.status(200).json(result)
    } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getAll",
      context: "Business/business.controller.ts/getAll",
    });
  }
} 

export const update: RequestHandler = async (req, res) => {
    try {
        const { business_id } = req.params as { business_id: string }
        const result = await service.update( business_id, req.body)

        return res.status(200).json(result)
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
} 

export const remove: RequestHandler = async (req, res) => {
    try {
         const { business_id } = req.params as { business_id: string }
        await service.delete(business_id)

         return res.status(204).json({message: "Negócio apagado com sucesso!"})
    } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar remove",
      context: "Business/business.controller.ts/remove",
    });
  }
} 