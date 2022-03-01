import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
type Request = {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  public async execute({ email, password, name }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError("Email address already user");
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
