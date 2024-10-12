/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { Prisma } from '@prisma/client';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() payload: Prisma.CourseCreateInput) {
    return this.courseService.createCourse(payload);
  }

  @Get()
  async getCourses() {
    return this.courseService.getCourse();
  }

  @Get('filter')
  async filterCourses(@Query('category') category: string) {
    console.log(category);
    return this.courseService.filterCourses(category);
  }
  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(+id);
  }
}
