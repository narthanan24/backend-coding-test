"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
class AuthService {
    static getToken(authToken) {
        const match = authToken.match(/^Bearer (.*)$/);
        if (!match || match.length < 2) {
            throw new common_1.UnauthorizedException("Invalid bearer token");
        }
        return match[1];
    }
    async authenticate(authToken) {
        const tokenString = AuthService.getToken(authToken);
        try {
            const decodedToken = await admin.auth().verifyIdToken(tokenString);
            const { email, uid, role } = decodedToken;
            return { email, uid, role };
        }
        catch (e) {
            throw new common_1.UnauthorizedException(e.message);
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map