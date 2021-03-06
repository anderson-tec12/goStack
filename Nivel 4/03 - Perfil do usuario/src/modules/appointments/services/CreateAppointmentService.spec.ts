import AppError from "@shared/errors/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

describe("CreateAppointment", () => {
  it("should be able to create new appointment", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: "123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123");
  });

  it("should not  be able to create two appointtments on the same time ", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2022, 5, 10, 11);
    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: "123",
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: "123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
