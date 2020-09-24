import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(registerData: RegisterDto) {
    try {
      const hashedPassword = bcrypt.hashSync(registerData.password, 10);

      const data = { ...registerData, hashed_password: hashedPassword };

      const user = await this.userService.createUser(data);

      return user;
    } catch (error) {}
  }

  async login(loginData: LoginDto) {
    const email = loginData.email;
    const password = loginData.password;
    const user = await this.userService.getUser({ email: email });

    if (!user) {
      throw new NotFoundException('Email is not match');
    }

    const isValidPassword = await this.verifyPassword(
      password,
      user.hashed_password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: email, _id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
