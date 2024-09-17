import { UserDto } from "src/comments/dto/user.dto";
import { PostDto } from "./post.dto";
import { IsNumber } from "class-validator";

export class LikeDto {
    @IsNumber()
    readonly user: UserDto
    readonly post: {
        readonly id: number
    }
}