"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
let AuthMiddleware = class AuthMiddleware {
    async use(req, res, next) {
        console.log(req.headers);
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                throw new common_1.HttpException({ message: "missing auth header" }, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = admin
                .auth()
                .verifyIdToken(req.headers.token)
                .then((decodedToken) => {
                const uid = decodedToken.uid;
                console.log(uid);
            });
            next();
        }
        catch (e) {
            throw new common_1.HttpException({ message: "invalid token" }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map