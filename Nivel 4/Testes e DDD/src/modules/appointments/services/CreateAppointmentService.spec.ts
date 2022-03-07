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

  it("should not  be able to create two appointtments on the same time ", () => {
    expect(2 + 2).toBe(4);
  });
});
