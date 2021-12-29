// import { uuid } from "uuidv4";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

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

export default User;
