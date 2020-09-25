import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Request() req, @Response() res, next: Function) {
    console.log(req);
    next();
  }
}
