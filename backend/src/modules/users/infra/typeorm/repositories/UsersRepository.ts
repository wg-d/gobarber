import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';
import iUsersRepository from '@modules/users/repositories/iUsersRepository';
import iCreateUsersDTO from '@modules/users/dtos/iCreateUserDto';

class UsersRepository implements iUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }


  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {email}
    });

    return user;
  }

  public async create(userData: iCreateUsersDTO) : Promise<User> {
    const User = this.ormRepository.create(userData);
    await this.ormRepository.save(User);
    return User;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
