// import { uuid } from "uuidv4";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "./User";
/*
  KISS - Keep It Simple & Stupid
*/

/*
  Relacionamentos
  Um para Um (one to one)
  Um para Muitos (one to many)
  muitos para muitos (many to many)
*/

@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider: User; // UMA PROPRITEDADE

  @Column("time with time zone")
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  //provider: string, date: Date
  // constructor({ date, provider }: Omit<Appointment, "id">) {
  //   // this.provider = provider;
  //   // this.date = date;
  //   // this.id = uuid();
  // }
}

export default Appointment;
