import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";

import User from "../infra/typeorm/entities/User";

type Request = {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password, name }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("Email address already user");
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    return user;
  }
}

export default CreateUserService;
