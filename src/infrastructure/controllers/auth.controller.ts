import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/application/auth/dto/auth.dto';
import { AuthService } from 'src/application/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return this.authService.login(user);
  }
}
