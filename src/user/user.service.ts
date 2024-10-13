/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaserService: DatabaseService) {}

  async createUser(
    createDto: Prisma.UserCreateInput,
  ): Promise<Record<string, any>> {
    try {
      const createdUser = await this.databaserService.user.create({
        data: createDto,
      });
      return { createdUser };
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(id: number): Promise<Record<string, any>> {
    try {
      const userProfile = await this.databaserService.user.findFirst({
        where: { id },
      });

      return { userProfile };
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(
    id: number,
    updateDto: Prisma.UserUpdateInput,
  ): Promise<Record<string, any>> {
    try {
      const updatedUser = await this.databaserService.user.update({
        where: { id },
        data: updateDto,
      });
      return { updatedUser };
    } catch (error) {
      console.log(error);
    }
  }
}
