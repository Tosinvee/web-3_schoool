/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { EnrolledCourseService } from './enrolled-course.service';

@Controller('enrolled-course')
export class EnrolledCourseController {
    constructor(private readonly enrolledCourseService:EnrolledCourseService){}

    @Get()
    async getCourses(@Query('chatId') chatId: bigint) {
      return this.enrolledCourseService.getCourses(chatId);
    }
    
    @Delete(':courseId')
    async removeCourse(@Param('courseId') courseId: number) {
      return this.enrolledCourseService.removeCourse(courseId);
    } 
}
