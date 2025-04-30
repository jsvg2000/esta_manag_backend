import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private readonly reflector:Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.getAllAndOverride('roles',[
      context.getHandler(),
      context.getClass()
    ]);

    if(!roles){
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    return roles.includes(user.role);
  }
}
