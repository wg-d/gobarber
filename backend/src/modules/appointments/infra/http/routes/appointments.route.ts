import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(EnsureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const appointmentsRepository = new AppointmentsRepository();

  const createAppointment = new CreateAppointmentService(appointmentsRepository);
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
