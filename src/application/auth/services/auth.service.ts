import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/application/users/services/users.service';
import { UserEntity } from 'src/domain/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(body: LoginDto) {
    const user = await this.usersService.getByEmail(body.email);
    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(body.password, user.password_hash);
    return isValid ? user : null;
  }

  login(user: UserEntity) {
    const { id: sub, email, role } = user;

    return {
      access_token: this.jwtService.sign(
        { sub, email, role },
        { expiresIn: '1d' },
      ),
    };
  }

  async register(data: RegisterDto) {
    const password = await bcrypt.hash(data.password, 12);
    return this.usersService.create({ ...data, password });
  }
}
