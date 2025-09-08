
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import type { User } from 'src/models/user';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto } from './dto/create.user.dto';
import type { PaginationResult } from 'src/models/pagination.result';
import type { PaginationParams, PaginationParamsRequest } from 'src/models/pagination.params';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get()
    getAll(@Query() paginationParamsRequest: PaginationParamsRequest): PaginationResult<User> {
        const paginationParams: PaginationParams = {
            page: parseInt(paginationParamsRequest.page),
            pageSize: parseInt(paginationParamsRequest.pageSize)
        }

        return this.usersService.getAll(paginationParams.page, paginationParams.pageSize);
    }

    @Get("dropdown")
    getAllWithIdAndName() : UserDto[]
    {
        return this.usersService.getAllWithIdAndName();
    }

    @Get(":id")
    get(@Param('id') id: number): User | undefined {
        return this.usersService.get(id);
    }
    
    @Put(":id")
    update(@Param('id') id: number, @Body() user: UpdateUserDto): boolean {

        return this.usersService.update(id, user);
    }

    @Delete(":id")
    delete(@Param('id') id: number): boolean {
        return this.usersService.delete(id);
    }

}
