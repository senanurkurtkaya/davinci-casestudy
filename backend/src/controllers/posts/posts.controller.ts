// src/controllers/posts/posts.controller.ts
import { Body, Controller, Get, Param, Patch, Post as HttpPost, Delete, ParseIntPipe } from "@nestjs/common";
import { PostsService } from "src/services/posts/posts.service";
import { CreatePostDto } from "src/controllers/posts/dto/create.post.dto";
import { UpdatePostDto } from "src/controllers/posts/dto/update.post.dto";

@Controller("posts") 
export class PostsController {
  constructor(private readonly svc: PostsService) {}

  @HttpPost()
  create(@Body() dto: CreatePostDto) {
    return this.svc.create(dto as any);
  }

  @Get()
  getAll() {
    return this.svc.getAll();
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.svc.get(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.svc.update(id, dto as any);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.svc.delete(id);
  }
}
