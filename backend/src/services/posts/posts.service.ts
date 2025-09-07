import { Injectable } from "@nestjs/common";
import { Post } from "src/models/post";
import POSTS from "../../data/posts.json";
import { PaginationResult } from "src/models/pagination.result";

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private nextId = 1;

    constructor() {
        this.posts = POSTS;
    }
    create(post: Post): boolean {
        const lastId = this.posts[this.posts.length - 1].id;

        this.posts.push({
            ...post,
            id: lastId + 1
        });

        return true;
    }

    getAll(page: number, pageSize: number): PaginationResult<Post> {
        const totalRowCount = this.posts.length;
        console.log("page * pageSize", page * pageSize);

        console.log("(page + 1) * pageSize", (page + 1) * pageSize)
        console.log(typeof page)

        const data = this.posts.slice(page * pageSize, (page + 1) * pageSize)
        return {
            totalRowCount,
            data
        };
    }

    get(id: number): Post | undefined {
        return this.posts.find(post => post.id == id);
    }

    update(id: number, post: Post): boolean {
        const index = this.posts.findIndex(post => post.id == id);
        if (index !== -1) {
            this.posts[index] = post;
            return true;
        }
        return false;
    }

    delete(id: number): boolean {
        const index = this.posts.findIndex(post => post.id == id);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }
}