import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.production',
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://cody:GFdPjfRLEEjuiVUQ@cluster0-uuofi.mongodb.net/mern-social',
    ),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
