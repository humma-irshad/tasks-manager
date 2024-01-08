import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Tasks } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), UserModule],
  exports: [TypeOrmModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
