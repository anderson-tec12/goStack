import { inject, injectable } from "tsyringe";

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";

import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import usersRouter from "../infra/http/routes/users.routes";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    email,
    name,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError("E-mail already in use");
    }

    user.email = email;
    user.name = name;

    if (password && !old_password) {
      throw new AppError(
        "YOu need to inform the old password to set a new passowrd  "
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.comparehash(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError("Old password does not match");
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
