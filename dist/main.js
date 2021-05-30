"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const logger_middleware_1 = require("./logger/logger.middleware");
const swagger_1 = require("@nestjs/swagger");
dotenv.config();
async function bootstrap() {
    admin.initializeApp({
        credential: admin.credential.cert({
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(logger_middleware_1.logger);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Code-Test')
        .setDescription('The codeTest API description')
        .setVersion('1.0')
        .addTag('codeTest')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map