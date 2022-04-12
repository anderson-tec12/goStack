import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateAppointmentService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe("CreateUser", () => {
  it("should be able to create new user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateAppointmentService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUserService.execute({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create new user with samae email from another", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateAppointmentService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    expect(
      createUserService.execute({
        name: "John Doe",
        email: "johndoe@example.com.br",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
