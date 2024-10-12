import { Module } from '@nestjs/common';
import { EnrolledCourseController } from './enrolled-course.controller';
import { EnrolledCourseService } from './enrolled-course.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EnrolledCourseController],
  providers: [EnrolledCourseService],
})
export class EnrolledCourseModule {}
