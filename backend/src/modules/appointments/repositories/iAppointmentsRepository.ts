import Appointment from '../infra/typeorm/entities/Appointments';
import iCreateAppointmentDTO from '../dtos/iCreateAppointmentDTO';

export default interface iAppointmentsRepository {
  create(data: iCreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
