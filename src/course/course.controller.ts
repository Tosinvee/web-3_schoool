/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
constructor(private readonly courseService:CourseService){}

@Get()
async getCourses(){
    return this.courseService.getCourse()
}

@Get(':id')
  async getCourseById(@Param('id') id: number) {
    return this.courseService.getCourseById(id);
  }

  @Get('filter')
  async filterCourses(@Query('category') category: string) {
    return this.courseService.filterCourses(category);
  }
}
