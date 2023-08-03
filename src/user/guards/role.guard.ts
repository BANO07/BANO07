import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorator/role.decorator";
import { Role } from "../enum/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }
    //  console.log("------------------------------0-ffffffffffff-----------------",context.switchToHttp().getRequest())

      const { user }  = context.switchToHttp().getRequest()

      console.log(user,"---------------------------------",requiredRoles)
      return requiredRoles.some((Role) => user.roles?.includes(Role));
      // if(requiredRoles == user.roles) return true

      // const payload = this.getUserFromContext(context);
      // console.log(payload,"++++++++++++++++++++++++++++++++++++++++++")

      // if(!payload || payload.roles){
      //   return false;
      // }

      // const userRoles = payload.roles;

      // console.log(userRoles,"-------------------------------------")
      // const hasRole = requiredRoles.some(role => userRoles.includes(role));
      // return hasRole;
  }

    //   private getUserFromContext(context: ExecutionContext){
    //     const ctxType = context.getType();
    //     switch(ctxType){
    //       case 'http':
    //         const request = context.switchToHttp().getRequest();
    //         return request.user;
    //   default:
    //     return null;
    //   }
    //   // const { user } = context.switchToHttp().getRequest();
    //   // console.log(user,"---------------------------------",requiredRoles)
    //   // if(requiredRoles == user.roles) return true
    //   // return requiredRoles.some((Role) => user.roles?.includes(Role));
    // }
}