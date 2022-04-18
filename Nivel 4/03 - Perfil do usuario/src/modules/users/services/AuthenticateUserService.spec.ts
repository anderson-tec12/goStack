import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";

import CreateUserService from "./CreateUserService";

describe("AuthenticateUser", () => {
  it("should be able to authenticate", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      email: "johndoe@example.com.br",
      password: "123123",
      name: "John Joe",
    });

    const reponse = await authenticateUser.execute({
      email: "johndoe@example.com.br",
      password: "123123",
    });

    expect(reponse).toHaveProperty("token");
    expect(reponse.user).toEqual(user);
  });

  it("should not be able to authenticate with non existing user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: "johndoe@example.com.br",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      email: "johndoe@example.com.br",
      password: "123123",
      name: "John Joe",
    });

    expect(
      authenticateUser.execute({
        email: "johndoe@example.com.br",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
