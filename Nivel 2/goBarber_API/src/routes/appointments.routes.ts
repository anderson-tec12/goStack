import { Router } from "express";
import { startOfHour, parseISO, isEqual } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post("/", (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = parseISO(date);
  const startHour = startOfHour(parsedDate);
  const findAppointmentInSameDate =
    appointmentsRepository.findByDate(startHour);

  if (findAppointmentInSameDate) {
    return res.status(400).json({
      message: "This appointment is already booked",
    });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: startHour,
  });

  return res.json(appointment);
});

appointmentsRouter.get("/", (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

export default appointmentsRouter;
