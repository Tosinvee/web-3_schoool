/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){}

    @Post('create')
    async createUser(@Body() createDto: Prisma.UserCreateInput){
return this.userService.createUser(createDto);
           

    }

    @Get(':id')
    async getUser(@Param('id') id:number){
        return await this.userService.getUser(id)
    }

    @Patch(':id')
    async updateUser(
     @Param(':id') id:number,
     @Body() updateDto:Prisma.UserUpdateInput ,  
    ){
            return this.userService.updateUser(id, updateDto)
            
    }
    
}
