import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
  constructor(private readonly authService:AuthService) {
  }

  public async use(req: any, res: any, next: () => void) {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        throw new HttpException({ message: "missing auth header" }, HttpStatus.BAD_REQUEST);
      }
      const user=await this.authService.authenticate(authorization)
      req.user=user;
      next()
    }catch (e){
      throw new HttpException({message:"invalid token"}, HttpStatus.UNAUTHORIZED)
    }
  }
}

