import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";
import { UsersDto } from "./users.dto";
export declare class UserRepository extends Repository<UserEntity> {
    createUser: (userDto: UsersDto) => Promise<{
        uid: string;
    }>;
}
