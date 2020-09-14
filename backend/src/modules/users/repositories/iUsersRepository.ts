import User from '../infra/typeorm/entities/User';
import iCreateUserDTO from '../dtos/iCreateUserDto';

export default interface iUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: iCreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
