import {
  Controller,
  Get,
  Res,
  HttpStatus,
  NotFoundException,
  Req,
  Put,
  Delete,
  Body,
  UseGuards,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsOwnerGuard } from 'src/auth/guards/owner.guard';
import UpdateUserDto from './dto/update-user.dto';
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

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getUserById(@Res() res, @Req() req) {
    try {
      const user = req.profile;

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      throw new NotFoundException('Not found');
    }
  }

  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @Put('user/:userId')
  async updateUser(@Res() res, @Req() req, @Body() formData: UpdateUserDto) {
    try {
      const user = req.profile;
      const updatedUser = await this.userService.updateUser(user, formData);
      return res.status(HttpStatus.OK).json(updatedUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @Delete('user/:userId')
  async removeUser(@Res() res, @Req() req) {
    try {
      const user = req.profile;
      const removedUser = await this.userService.removeUser(user);
      return res.status(HttpStatus.OK).json(removedUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
