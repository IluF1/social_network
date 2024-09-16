import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostControllerDto } from './dto/postController.dto';
import { LikeDto } from './dto/like.dto';


@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Body() post: PostDto,
    @UploadedFile() image: any,
  ) {
    return this.postService.createPost(post, image);
  }

  @Post('/getPosts')
  async getPosts(@Body() body: PostControllerDto) {
    return this.postService.getPosts(body);
  }

  @Post('/setLike')
  async setLike(@Body() body: LikeDto) {
    return this.postService.like(body);
  }
}
