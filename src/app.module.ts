import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModule } from './task/task.module';
import { Tasks } from './task/entities/task.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.getOrThrow('DATABASE_NAME'),
        entities: [Tasks],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TaskModule,
    UserModule,
  ],
})
export class AppModule {}
