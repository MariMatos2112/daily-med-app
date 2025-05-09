import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/application/auth/dto/auth.dto';
import { AuthService } from 'src/application/auth/services/auth.service';
import { ApiService } from '../services/api.service';
import { AUTH_MESSAGES } from 'src/common/constants/messages.constants';

const { USER_REGISTERED, USER_LOGGED_IN } = AUTH_MESSAGES;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly apiService: ApiService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    await this.authService.register(body);
    return this.apiService.buildResponse(USER_REGISTERED);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const token = this.authService.login(user);
    return this.apiService.buildResponse(USER_LOGGED_IN, token);
  }
}
