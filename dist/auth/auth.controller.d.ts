import { AuthService } from "./auth.service";
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getAccessToken(req: Request): Promise<any>;
}
