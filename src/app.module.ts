import { Module } from '@nestjs/common';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { SprintModule } from './sprint/sprint.module';
import { UserModule } from './user/user.module';
import { SprintController } from './sprint/sprint.controller';
import { UserController } from './user/user.controller';
import { SprintService } from './sprint/sprint.service';
import { UserService } from './user/user.service';
import { TaskService } from './task/task.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, TaskModule, SprintModule, UserModule, AuthModule],
  controllers: [SprintController, TaskController, UserController],
  providers: [SprintService, UserService, TaskService],
})
export class AppModule {}
