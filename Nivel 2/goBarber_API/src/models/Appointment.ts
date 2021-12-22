import { uuid } from "uuidv4";

class Appointment {
  id: string;
  provider: string;
  date: Date;

  //provider: string, date: Date
  constructor({ date, provider }: Omit<Appointment, "id">) {
    this.provider = provider;
    this.date = date;
    this.id = uuid();
  }
}

export default Appointment;
