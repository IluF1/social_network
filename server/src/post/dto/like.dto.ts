import { UserDto } from "src/auth/dto/user.dto";
import { PostDto } from "./post.dto";
import { IsNumber } from "class-validator";

export class LikeDto {
    @IsNumber()
    readonly user: {
        readonly id: number
    }
    readonly post: {
        readonly id: number
    }
}