import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
