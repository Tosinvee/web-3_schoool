/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CourseService {
    constructor (private readonly databaseService:DatabaseService){}

    async getCourse():Promise<Record<string, any>> {
      try{
        return await this.databaseService.course.findMany()
      } catch(error){
        throw new error('Error fetching courses');
      } 
    }

    async getCourseById(id:number):Promise<Record<string, any>> {
        try {
          const course = await this.databaseService.course.findUnique({ where: { id } });
          if (!course) {
            throw new Error('Course not found');
          }
          return course;
        } catch (error) {
          throw new error('Error fetching course details');
        }
    }   
    
    async filterCourses(courseCategory: string): Promise<Record<string, any>> {
        try {
          return await this.databaseService.course.findMany({
            where: { courseCategory },
          });
        } catch (error) {
          throw new error('Error filtering courses');
        }
      }

      
}
