/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EnrolledCourseService {
    constructor(private readonly databaseService: DatabaseService){}

    async getCourses(chatId:bigint): Promise<Record<string, any>>{
        try{
            return await this.databaseService.enrolledCourse.findMany({
                where:{
                    chatId:chatId,
                },
                include:{
            course:true
                }
            })
        }catch(error){
            throw new Error('error fetching enrolled courses' + error.message)
        }
    }

    async removeCourse(courseId: number): Promise<Record<string, any>> {
        try {
          return await this.databaseService.course.delete({
            where: { id: courseId },
          });
        } catch (error) {
            throw new Error('error delecting enrolled courses' + error.message)
          
        }
      }   
}
