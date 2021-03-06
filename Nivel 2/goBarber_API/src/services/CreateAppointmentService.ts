import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

/*
  dependency inversion (SOLID)
*/
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const startHour = startOfHour(date);
    const findAppointmentInSameDate =
      this.appointmentsRepository.findByDate(startHour);

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: startHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
