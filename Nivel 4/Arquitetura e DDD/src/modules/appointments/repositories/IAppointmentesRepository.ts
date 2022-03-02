import Appointment from "../infra/typeorm/entities/Appointment";

export default interface IAppointmentesRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
