import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

// import AppError from "../errors/AppError";
import AppError from "@shared/errors/AppError";
import Appointment from "../infra/typeorm/entities/Appointment";
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
      throw new AppError("This appointment is already booked");
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: startHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
