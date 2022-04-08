import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateAppointmentService from "./CreateUserService";

describe("CreateUser", () => {
  it("should be able to create new user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateAppointmentService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: "John Doe",
      email: "johndoe@example.com.br",
      password: "123123",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create new user with samae email from another", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateAppointmentService(fakeUsersRepository);

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
