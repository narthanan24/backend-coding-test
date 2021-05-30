import { Body, Controller, Post } from "@nestjs/common";
import { UsersDto } from "./users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private userService:UserService) {}

  @Post()
  create(@Body() userDto: UsersDto){
      return this.userService.create(userDto);
  }
}
