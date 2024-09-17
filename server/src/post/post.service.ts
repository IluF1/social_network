import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';
import { PostControllerDto } from './dto/postController.dto';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(post: PostDto, image: string) {
    if (!post.content || !post.userLogin) {
      throw new BadRequestException('Content or userLogin is missing');
    }

    const user = await this.prisma.user.findUnique({
      where: { login: post.userLogin },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          image: image || null,
          author: { connect: { id: user.id } },
          createdAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Error creating post:', error);
      throw new BadRequestException('Error creating post');
    }
  }

  async getPosts(post: PostControllerDto) {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          author: true,
          likes: true,
          comments: {
            include: {
              user: true
            }
          }
        },
        skip: (post.page - 1) * post.limit,
        take: post.limit,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const postsWithCounts = await Promise.all(
        posts.map(async (post) => {
          const [likesCount, commentsCount, postsCount] = await Promise.all([
            this.prisma.likes.count({ where: { postId: post.id } }),
            this.prisma.comments.count({ where: { postId: post.id } }),
            this.prisma.post.count({where: { id: post.id }})
          ]);

          return {
            ...post,
            likesCount,
            commentsCount,
          };
        }),
      );
      const postsCount = await this.prisma.post.count({
        where: { id: post.postId },
      });
      return { posts: postsWithCounts, postsCount };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new BadRequestException('Error fetching posts');
    }
  }

  async like(body: LikeDto) {
    const { post, user } = body;

    if (!post?.id || !user?.id) {
      throw new BadRequestException('Post ID or User ID is missing');
    }

    const [findPost, findUser] = await Promise.all([
      this.prisma.post.findUnique({ where: { id: post.id } }),
      this.prisma.user.findUnique({ where: { id: user.id } }),
    ]);

    if (!findPost) {
      throw new NotFoundException('Post not found');
    }

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    try {
      const likeAction = await this.prisma.$transaction(async (prisma) => {
        const existingLike = await prisma.likes.findUnique({
          where: {
            postId_userId: {
              postId: post.id,
              userId: user.id,
            },
          },
        });

        if (existingLike) {
          await prisma.likes.delete({
            where: { id: existingLike.id },
          });
          return { liked: false };
        } else {
          await prisma.likes.create({
            data: { postId: post.id, userId: user.id, createdAt: new Date() },
          });
          return { liked: true };
        }
      });

      const totalLikes = await this.prisma.likes.count({
        where: { postId: post.id },
      });

      return { totalLikes, liked: likeAction.liked };
    } catch (err) {
      console.error('Error processing like:', err);
      throw new BadRequestException('Could not process like');
    }
  }
}
