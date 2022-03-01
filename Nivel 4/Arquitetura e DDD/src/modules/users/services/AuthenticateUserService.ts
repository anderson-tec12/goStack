import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import config from "@config/auth";

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

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("Incorrect email/ password combination", 401);
    }

    const passwordMatched = await compare(password, user.password);

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
