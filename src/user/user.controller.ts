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
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsOwnerGuard } from 'src/auth/guards/owner.guard';
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
  @Get('user/info')
  async getUserInfo(@Res() res, @Req() req) {
    try {
      const userId = req.user._id;
      const userInfo = await this.userService.getUserInfo(userId);
      return res.status(HttpStatus.OK).json(userInfo);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard, IsOwnerGuard)
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
