import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import Appointment from "../../infra/typeorm/entities/Appointment";
import IAppointmentesRepository from "@modules/appointments/repositories/IAppointmentesRepository";
import { v4 } from "uuid";

import { isEqual } from "date-fns";

class AppointmentsRepository implements IAppointmentesRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    //  appointment.date = date
    //  appointment.provider_id = provider_id
    //  appointment.id = v4()
    Object.assign(appointment, { provider_id, date, id: v4() });

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
