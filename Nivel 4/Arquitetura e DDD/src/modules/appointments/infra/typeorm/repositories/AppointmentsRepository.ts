import { getRepository, Repository } from "typeorm";

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import Appointment from "../entities/Appointment";
import IAppointmentesRepository from "@modules/appointments/repositories/IAppointmentesRepository";

class AppointmentsRepository implements IAppointmentesRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    // const value: Appointment | null = findAppointment || null;

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
