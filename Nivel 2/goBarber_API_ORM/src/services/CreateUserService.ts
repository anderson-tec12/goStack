import { getRepository } from "typeorm";
import User from "../models/User";

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
      throw new Error("Email address already user");
    }

    const user = usersRepository.create({
      email,
      password,
      name,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
