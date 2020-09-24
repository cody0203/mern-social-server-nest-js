import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import RegisterDto from 'src/auth/dto/register.dto';
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

  async getById(userId: string): Promise<IUser> {
    return await this.userModal
      .findById(userId)
      .select('name email updated created bio')
      .populate('following', '_id name')
      .populate('followers', '_id name')
      .exec();
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
      //   console.log(error);
      //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
