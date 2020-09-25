import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { extend } from 'lodash';
import RegisterDto from 'src/auth/dto/register.dto';
import UpdateUserDto from './dto/update-user.dto';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModal: Model<IUser>) {}

  async getAll() {
    const users = await this.userModal
      .find({})
      .select('name email updated created');

    return users;
  }

  async getUserInfo(userId): Promise<IUser> {
    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.userModal
      .findById(userId)
      .select('name email updated created followers following');

    if (!user) {
      throw new NotFoundException('Not found');
    }

    return user;
  }

  public async getUser(param: object): Promise<IUser> {
    const user = await this.userModal.findOne(param);

    return user;
  }

  public async createUser(data: RegisterDto): Promise<IUser> {
    try {
      const email = data.email;
      const isExistedUser = await this.getUser({ email });

      if (isExistedUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const user = await this.userModal.create(data);

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Interactive user by id

  async getById(userId: string): Promise<IUser> {
    return await this.userModal
      .findById(userId)
      .select('name email updated created bio')
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();
  }

  async updateUser(user: IUser, updateData: UpdateUserDto): Promise<IUser> {
    try {
      let updatedUser = extend(user, updateData);
      await updatedUser.save();
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeUser(user: IUser): Promise<IUser> {
    try {
      const removedUser = await user.remove();
      return removedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
