import { getRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointments';
import iAppointmentRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import iCreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';

class AppointmentsRepository implements iAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date) : Promise<Appointment | undefined> {

    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment;
  }

  public async create({provider_id, date}: iCreateAppointmentDTO) : Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date});
    await this.ormRepository.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
