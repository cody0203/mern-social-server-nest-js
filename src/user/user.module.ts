import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerMiddleware } from './middlewares/get-user-profile.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api/user/:userId');
  }
}
