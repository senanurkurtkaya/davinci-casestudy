import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './controllers/posts/posts.controller';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { PostsService } from './services/posts/posts.service';
import { HomeController } from './controllers/home/home.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, PostsController, HomeController],
  providers: [AppService, UsersService, PostsService],
})
export class AppModule {}
