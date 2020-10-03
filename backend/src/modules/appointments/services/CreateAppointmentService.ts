
import {startOfHour} from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointments';
import iAppointmentsRepository from '../repositories/iAppointmentsRepository';
import {inject, injectable} from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface iRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: iAppointmentsRepository
    ) {}

  public async execute({date, provider_id}: iRequest) : Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
    if(findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
