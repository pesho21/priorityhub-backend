import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { SprintModule } from './sprint/sprint.module';
import { UserModule } from './user/user.module';
import { SprintController } from './sprint/sprint.controller';
import { UserController } from './user/user.controller';
import { SprintService } from './sprint/sprint.service';
import { UserService } from './user/user.service';
import { TaskService } from './task/task.service';

@Module({
  imports: [TaskModule, SprintModule, UserModule],
  controllers: [AppController, SprintController, TaskController, UserController],
  providers: [AppService, SprintService, UserService, TaskService],
})
export class AppModule {}
