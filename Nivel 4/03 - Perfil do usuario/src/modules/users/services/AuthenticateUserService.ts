import { sign } from "jsonwebtoken";
import config from "@config/auth";

import { inject, injectable } from "tsyringe";

import IHashProvider from "../providers/HashProvider/models/IHashProvider";

import IUsersRepository from "../repositories/IUsersRepository";

import AppError from "@shared/errors/AppError";
// import User from "../models/User";
import User from "../infra/typeorm/entities/User";

type Request = {
  email: string;
  password: string;
};
type Response = {
  user: User;
  token: string;
};

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/ password combination", 401);
    }

    const passwordMatched = await this.hashProvider.comparehash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("Incorrect email/ password combination", 401);
    }

    const token = sign({}, config.jwt.secret, {
      subject: user.id,
      expiresIn: config.jwt.expiresIn,
    }); //anderson

    return { user, token };
  }
}

export default AuthenticateUserService;
