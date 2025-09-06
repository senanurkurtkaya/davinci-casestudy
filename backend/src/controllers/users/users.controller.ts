
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import type { User } from 'src/models/user';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from './dto/create.user.dto';
import type { PaginationResult } from 'src/models/pagination.result';
import type { PaginationParams } from 'src/models/pagination.params';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto as any);
    }

    @Get()
    getAll(@Query() paginationParams: PaginationParams): PaginationResult<User> {

        return this.usersService.getAll(paginationParams.page, paginationParams.pageSize);
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
