import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { RegisterDto } from 'src/application/auth/dto/auth.dto';
import { UserEntity } from 'src/domain/user.entity';
import { UpdateUserDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getByName(name: string) {
    return this.userRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  async create(data: RegisterDto) {
    const existing = await this.getByEmail(data.email);
    if (existing) throw new ConflictException('Email already in use');

    const user = this.userRepository.create({
      ...data,
      password_hash: data.password,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const { email, name } = data;
    await this.getById(id);

    return this.userRepository.update(id, { email, name });
  }

  async deleteUser(id: string) {
    const user = await this.getById(id);
    await this.userRepository.remove(user);
  }
}
