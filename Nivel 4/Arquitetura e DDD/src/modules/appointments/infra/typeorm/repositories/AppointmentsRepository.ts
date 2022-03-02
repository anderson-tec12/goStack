import { EntityRepository, Repository } from "typeorm";

import Appointment from "../entities/Appointment";
import IAppointmentesRepository from "@modules/appointments/repositories/IAppointmentesRepository";

@EntityRepository(Appointment)
class AppointmentsRepository
  extends Repository<Appointment>
  implements IAppointmentesRepository
{
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    // const value: Appointment | null = findAppointment || null;

    return findAppointment;
  }
}

export default AppointmentsRepository;
