// import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

import { inject, injectable } from "tsyringe";

// import User from "../infra/typeorm/entities/User";

import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";

type Request = {
  email: string;
};

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail({
      subject: `[GoBarber] Recuperação de senha`,
      templateData: {
        template: "Olá, {{name}}: {{token}}",
        variables: {
          name: user.name,
          token,
        },
      },
      to: {
        email: user.email,
        name: user.name,
      },
    });
  }
}

export default SendForgotPasswordEmailService;
