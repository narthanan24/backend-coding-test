import { NestMiddleware } from "@nestjs/common";
import { AuthService } from "./auth.service";
export declare class AuthMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: AuthService);
    use(req: any, res: any, next: () => void): Promise<void>;
}
