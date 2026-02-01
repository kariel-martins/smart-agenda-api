import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeAppointmentService } from "./appointment.factory";

const Appointment = makeAppointmentService()

export const create: RequestHandler = async (req, res) => {
  try {
    const businessId = req.cookies.businessId
    const result = await Appointment.create(businessId, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar create",
      context: "Appointment/appointment.controller.ts/create",
    });
  }
};

export const getByDate: RequestHandler = async (req, res) => {
  try {
    const { date } = req.query as {date: string}
    const result = await Appointment.getByDate(date);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar getById",
      context: "Appointment/appointment.controller.ts/getById",
    });
  }
};

export const complete: RequestHandler = async (req, res) => {
  try {
     const { appointments_id } = req.params
    const result = await Appointment.update(Number(appointments_id), {status: "completed"});
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar complete",
      context: "Appointment/appointment.controller.ts/complete",
    });
  }
};

export const cancel: RequestHandler = async (req, res) => {
  try {
    const { appointments_id } = req.params
    const { cancel_reason } = req.body
    const result = await Appointment.update(Number(appointments_id), {cancel_reason, status: "canceled"});

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar cancel",
      context: "Appointment/appointment.controller.ts/cancel",
    });
  }
};

export const confirm: RequestHandler = async (req, res) => {
  try {
     const { appointments_id } = req.params
    const result = await Appointment.update(Number(appointments_id), {status: "confirmed", confirm_at: new Date()});

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar confirm",
      context: "Appointment/appointment.controller.ts/confirm",
    });
  }
};

export const noShow: RequestHandler = async (req, res) => {
  try {
     const { appointments_id } = req.params
    const result = await Appointment.update(Number(appointments_id), {status: "no_show", cancel_reason: "contratante aunsente"});

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    res.status(500).json({
      message: "Erro ao processar confirm",
      context: "Appointment/appointment.controller.ts/confirm",
    });
  }
};
