import { Module } from '@nestjs/common';
import { EnrolledCourseController } from './enrolled-course.controller';
import { EnrolledCourseService } from './enrolled-course.service';

@Module({
  controllers: [EnrolledCourseController],
  providers: [EnrolledCourseService]
})
export class EnrolledCourseModule {}
