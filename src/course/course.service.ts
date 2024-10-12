/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createCourse(
    createCourseDTO: Prisma.CourseCreateInput,
  ): Promise<Record<string, any>> {
    try {
      return await this.databaseService.course.create({
        data: createCourseDTO,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCourse(): Promise<Record<string, any>> {
    try {
      return await this.databaseService.course.findMany();
    } catch (error) {
      throw new error('Error fetching courses');
    }
  }

  async getCourseById(id: number): Promise<Record<string, any>> {
    try {
      const course = await this.databaseService.course.findFirst({
        where: { id },
      });
      if (!course) {
        throw new Error('Course not found');
      }
      return course;
    } catch (error) {
      console.log(error);
    }
  }

  async filterCourses(courseCategory: string): Promise<Record<string, any>> {
    try {
      return await this.databaseService.course.findMany({
        where: { courseCategory },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
