import { Repository } from "typeorm";
import { UserEntity } from "./users.entity";
import { UsersDto } from "./users.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(userDto: UsersDto): Promise<{
        uid: string;
    }>;
}
