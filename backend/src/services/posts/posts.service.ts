import { Injectable } from "@nestjs/common";
import { Post } from "src/models/post";
import POSTS from "../../data/posts.json";
import { PaginationResult } from "src/models/pagination.result";
import { CreatePostDto } from "src/controllers/posts/dto/create.post.dto";
import { UpdatePostDto } from "src/controllers/posts/dto/update.post.dto";

@Injectable()
export class PostsService {
    private posts: Post[] = [];
 
    constructor() {
        this.posts = POSTS;
    }
    create(post: CreatePostDto): boolean {
        const lastId = this.posts[this.posts.length - 1].id;

        this.posts.push({
            ...post,
            id: lastId + 1
        });

        return true;
    }

    getAll(page: number, pageSize: number): PaginationResult<Post> {
        const totalRowCount = this.posts.length;

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
    getUsersPosts(postId:number):string {
        return`This action returns all posts for post #${postId}`;

    }
}