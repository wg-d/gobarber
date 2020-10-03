import { Router } from 'express';
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(EnsureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
