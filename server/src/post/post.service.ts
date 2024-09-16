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
          likes: true,
          comments: true,
        },
      });

      return {
        postsWithLikesCount: posts.map((post) => ({
          ...post,
          likesCount: post.likes.length,
          commentsCount: post.comments.length,
        })),
      };
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
      const existingLike = await this.prisma.likes.findUnique({
        where: {
          postId_userId: {
            postId: post.id,
            userId: user.id,
          },
        },
      });

      if (existingLike) {
        // Update existing like
        await this.prisma.likes.update({
          where: { id: existingLike.id },
          data: { createdAt: new Date() },
        });
      } else {
        // Create new like
        await this.prisma.likes.create({
          data: {
            postId: post.id,
            userId: user.id,
            createdAt: new Date(),
          },
        });
      }

      const totalLikes = await this.prisma.likes.count({
        where: { postId: post.id },
      });

      return { totalLikes };
    } catch (err) {
      console.error('Error adding like:', err);
      throw new BadRequestException('Could not add like');
    }
  }
}
