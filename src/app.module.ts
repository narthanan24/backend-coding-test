import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthMiddleware } from "./auth/auth.middleware";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";
import { logger } from "./logger/logger.middleware";
import { BlogModule } from "./blog/blog.module";
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forRoot(),UsersModule,BlogModule,ScheduleModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      // multiple logger
      .apply(AuthMiddleware,logger)
      .exclude({ path: "users",method:RequestMethod.POST },{path:"blog/public",method:RequestMethod.GET})
      .forRoutes({ path:'*',method:RequestMethod.ALL })
  }
}
