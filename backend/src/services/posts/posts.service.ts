import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  create(): string {
    return "This action adds a new post";
  }

  getAll(): string {
    return "This action returns all posts";
  }

  get(id: string): string {
    return `This action returns a #${id} post`;
  }

  update(id: string): string {
    return `This action updates a #${id} post`;
  }

  delete(id: string): string {
    return `This action removes a #${id} post`;
  }
}