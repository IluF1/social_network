import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/createComment')
  async createComment(@Body() body: CommentDto) {
    return this.commentsService.createComment(body)
  }
}
