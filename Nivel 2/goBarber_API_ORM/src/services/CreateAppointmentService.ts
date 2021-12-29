import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  provider_id: string;
  date: Date;
}

/*
  dependency inversion (SOLID)
*/
class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const startHour = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      startHour
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: startHour,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
