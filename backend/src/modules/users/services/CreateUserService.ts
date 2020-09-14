import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import iUsersRepository from '../repositories/iUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor( private usersRepository: iUsersRepository) {}

  public async execute({ name, email, password}: Request): Promise<User> {

    // cannot create user with duplicated email
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if(checkUserExists) {
      throw new AppError('Email address already used');
    }

    // create user
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }
}

export default CreateUserService;
