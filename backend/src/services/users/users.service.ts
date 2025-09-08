import { Injectable } from "@nestjs/common";
import { User } from "src/models/user";
import USERS from '../../data/users.json';
import { PaginationResult } from "src/models/pagination.result";
import { CreateUserDto } from "src/controllers/users/dto/create.user.dto";
import { UserDto } from "src/controllers/users/dto/user.dto";
import { UpdateUserDto } from "src/controllers/users/dto/update.user.dto";


@Injectable()
export class UsersService {
    private users: User[] = [];
    constructor() {
        this.users = USERS;
    }

    create(user: CreateUserDto): boolean {
        const lastId = this.users[this.users.length - 1].id;

        this.users.push({
            ...user,
            id: lastId + 1
        });
        return true;
    }

    getAll(page: number, pageSize: number): PaginationResult<User> {
        const totalRowCount = this.users.length;
        const data = this.users.slice(page * pageSize, (page + 1) * pageSize)

        return {
            totalRowCount,
            data
        };
    }

    get(id: number): User | undefined {
        const user = this.users.find(user => user.id == id);
        return user;
    }

    update(id: number, userData: UpdateUserDto): boolean {
        const user = this.users.find(user => user.id == id);
        if (user) {
            user.name = userData.name;
            user.username = userData.username;
            user.email = userData.email;
            return true;
        }
        return false;
    }

    delete(id: number): boolean {
        const userIndex = this.users.findIndex(user => user.id == id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }

    getAllWithIdAndName(): UserDto[] {
        return this.users.map(user => {
            return {
                id: user.id,
                name: user.name
            }
        });
    }
}