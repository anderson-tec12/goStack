import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";

describe("SendForgotPasswordEmail", () => {
  it("should be able to recover the passoword using the email", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    const createUserService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    await createUserService.execute({
      email: "johndoe@example.com.br",
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
