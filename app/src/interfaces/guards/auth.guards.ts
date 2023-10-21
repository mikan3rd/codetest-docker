import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserUsecase } from '../../usecases/user.usecase';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userUsecase: UserUsecase) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['apikey'];
    if (typeof apiKey !== 'string') {
      throw new UnauthorizedException();
    }
    const user = await this.userUsecase.findByApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException();
    }
    request['user'] = user;
    return true;
  }
}
