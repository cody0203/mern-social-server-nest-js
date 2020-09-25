import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const requestId = request.params.userId;
    const user = request.user;

    if (user._id.toString() === requestId.toString()) {
      return true;
    }

    // throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
