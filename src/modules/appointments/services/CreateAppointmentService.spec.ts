import AppError from '@shared/errors/AppErrors';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123343532',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123343532');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 5, 14, 10);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123343532',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123343532',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
