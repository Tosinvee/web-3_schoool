/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { DatabaseModule } from './database/database.module';
import { EnrolledCourseModule } from './enrolled-course/enrolled-course.module';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BotModule, DatabaseModule, EnrolledCourseModule,CourseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
