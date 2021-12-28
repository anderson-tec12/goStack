// import { uuid } from "uuidv4";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider: string;

  @Column("time with time zone")
  date: Date;

  //provider: string, date: Date
  // constructor({ date, provider }: Omit<Appointment, "id">) {
  //   // this.provider = provider;
  //   // this.date = date;
  //   // this.id = uuid();
  // }
}

export default Appointment;
