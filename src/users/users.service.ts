import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";
import { UsersDto } from "./users.dto";
import * as admin from "firebase-admin";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
  }

  async create(userDto: UsersDto){
    const { email, password, role } = userDto;
    try {
      const { uid } = await admin.auth().createUser({
        email,
        password
      });
      await admin.auth().setCustomUserClaims(uid, { role });
      await this.userRepository.save(userDto);
      return { uid };
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  };
}
