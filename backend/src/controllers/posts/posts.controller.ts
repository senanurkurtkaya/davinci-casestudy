// src/controllers/posts/posts.controller.ts
import { Body, Controller, Get, Param, Patch, Post as HttpPost, Delete, ParseIntPipe, Query } from "@nestjs/common";
import { PostsService } from "src/services/posts/posts.service";
import { CreatePostDto } from "src/controllers/posts/dto/create.post.dto";
import { UpdatePostDto } from "src/controllers/posts/dto/update.post.dto";
import type { PaginationParams, PaginationParamsRequest } from "src/models/pagination.params";
import type { PaginationResult } from "src/models/pagination.result";
import { Post } from "src/models/post";

@Controller("posts")
export class PostsController {
  constructor(private readonly postService: PostsService) { }

  @HttpPost()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Get()
  getAll(@Query() paginationParamsRequest: PaginationParamsRequest):
    PaginationResult<Post> {
    const paginationParams: PaginationParams = {
      page: parseInt(paginationParamsRequest.page),
      pageSize: parseInt(paginationParamsRequest.pageSize)
    }

    return this.postService.getAll(paginationParams.page, paginationParams.pageSize);
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.postService.get(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.postService.update(id, dto as any);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
