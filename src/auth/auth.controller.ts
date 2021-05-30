import { BadRequestException, Controller, Get, HttpStatus, Req, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from 'express';
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('auth')
export class AuthController{

  constructor(private authService:AuthService) {
  }

  @Get()
  @ApiBearerAuth()
  async getAccessToken(@Req() req: Request):Promise<any>{
    const authToken = req.headers.authorization;

    if(!authToken){
      throw new BadRequestException('Missing auth header')
    }

    try {
      const {uid,email,role}=await this.authService.authenticate(authToken);
      return {uid,email,role,status:HttpStatus.OK};
    }catch (e) {
      throw new UnauthorizedException(e)
    }

  }
}
