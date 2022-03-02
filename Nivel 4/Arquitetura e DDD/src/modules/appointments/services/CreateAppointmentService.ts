import { startOfHour } from "date-fns";

// import AppError from "../errors/AppError";
import AppError from "@shared/errors/AppError";
import Appointment from "../infra/typeorm/entities/Appointment";

import IAppointmentsRepository from "../repositories/IAppointmentesRepository";

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

/*
  dependency inversion (SOLID)
*/
class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const startHour = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(startHour);

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: startHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
