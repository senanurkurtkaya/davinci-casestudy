
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import type { User } from 'src/models/user';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() user: User): boolean {
        return this.usersService.create(user);
    }

    @Get()
    getAll(): User[] {

        return this.usersService.getAll();
    }

    @Get(":id")
    get(@Param('id') id: number): User | undefined {
        console.log("Getting user with id:", id);
        return this.usersService.get(id);
    }
    @Put(":id")
    update(@Param('id') id: number, @Body() user: User): boolean {

        return this.usersService.update(id, user);
    }
    @Delete(":id")
    delete(@Param('id') id: number): boolean {
        return this.usersService.delete(id);
    }
    @Get(":id/posts")
    getUserPosts(@Param('id') userId: number): string {
        return this.usersService.getUserPosts(userId);
    }
}
