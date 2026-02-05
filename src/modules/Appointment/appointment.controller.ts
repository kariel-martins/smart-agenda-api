import { RequestHandler } from "express";
import { AppError } from "../../core/errors/AppError";
import { makeAppointmentService } from "./appointment.factory";

const Appointment = makeAppointmentService()

export const create: RequestHandler = async (req, res, next) => {
  try {
    const businessId = req.cookies.businessId
    const result = await Appointment.create(businessId, req.body);

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const getByDate: RequestHandler = async (req, res, next) => {
  try {
    const { date } = req.query as {date: string}
    const result = await Appointment.getByDate(date);

    return res.status(200).json(result);
  }  catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const complete: RequestHandler = async (req, res, next) => {
  try {
     const { appointments_id } = req.params
    const result = await Appointment.update(Number(appointments_id), {status: "completed"});
    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const cancel: RequestHandler = async (req, res, next) => {
  try {
    const { appointments_id } = req.params
    const { cancel_reason } = req.body
    const result = await Appointment.update(Number(appointments_id), {cancel_reason, status: "canceled"});

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const confirm: RequestHandler = async (req, res, next) => {
  try {
     const { appointments_id } = req.params
    const result = await Appointment.update(Number(appointments_id), {status: "confirmed", confirm_at: new Date()});

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};

export const noShow: RequestHandler = async (req, res, next) => {
  try {
     const { appointments_id } = req.params
    const result = await Appointment.update(Number(appointments_id), {status: "no_show", cancel_reason: "contratante aunsente"});

    return res.status(200).json(result);
  } catch (error) {
    if (res.headersSent) return
    return next(error);
  }
};
