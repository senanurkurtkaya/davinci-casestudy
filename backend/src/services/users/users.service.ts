import { Injectable } from "@nestjs/common";
import { User } from "src/models/user";
import USERS from '../../data/users.json';


@Injectable()
export class UsersService {
    private users: User[] = [];
    constructor() {
        this.users = USERS;
    }

    create(user:User): boolean {
        // TODO: id should be generated
        this.users.push(user);
        return true;
    }

    getAll(): User[] {
        return this.users;
    }

    get(id: number): User | undefined {
        const user = this.users.find(user => user.id == id);
        return user;
    }
    update(id: number, userData: User): boolean {
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
    getUserPosts(userId: number): string {
        return `This action returns all posts for user #${userId}`;
    }
}