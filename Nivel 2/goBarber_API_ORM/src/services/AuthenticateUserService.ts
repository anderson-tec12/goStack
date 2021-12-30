import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from "../models/User";

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
      throw new Error("Incorrect email/ password combination");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect email/ password combination");
    }

    const token = sign({}, "89ba023086e37a345839e0c6a0d272eb", {
      subject: user.id,
      expiresIn: "1d",
    }); //anderson

    return { user, token };
  }
}

export default AuthenticateUserService;
