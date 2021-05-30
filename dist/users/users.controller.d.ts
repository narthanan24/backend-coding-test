import { UsersDto } from "./users.dto";
import { UserService } from "./users.service";
export declare class UsersController {
    private userService;
    constructor(userService: UserService);
    create(userDto: UsersDto): Promise<{
        uid: string;
    }>;
}
