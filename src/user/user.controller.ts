import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Req,
  Body,
  Put,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('/api')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  async getUsers(@Res() res) {
    try {
      const users = await this.userService.getAll();

      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getUserById(@Res() res, @Req() req, @Param('userId') userId) {
    try {
      const user = await this.userService.getById(userId);

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      throw new NotFoundException('Not found');
    }
  }
}
