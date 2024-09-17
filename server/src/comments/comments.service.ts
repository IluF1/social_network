import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) {}

    async createComment(comment: CommentDto) {
        if(!comment.content) {
            throw new NotFoundException("Невозможно создать комментарий")
        }
        const find = await this.prisma.post.findUnique({
            where: {
                id: comment.post_id
            }
        }) 

        if(!find) {
            throw new NotFoundException()
        }

        const findUser = await this.prisma.user.findUnique({
            where: {
                id: comment.user.id
            }
        })

        if(!findUser) {
            throw new NotFoundException("Ошибка, пользователь не найден")
        }

        const create = await this.prisma.comments.create({
          data: {
            postId: comment.post_id,
            content: comment.content,
            userId: comment.user.id,
          }  
        })

        return {
            comment: create,
            
        }
    }

    
}
