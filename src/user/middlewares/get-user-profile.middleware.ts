import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(@Request() req, @Response() res, next: Function) {
    try {
      const userId = req.params.userId;
      const user = await this.userService.getById(userId);
      req.profile = user;
      next();
    } catch (error) {}
  }
}
