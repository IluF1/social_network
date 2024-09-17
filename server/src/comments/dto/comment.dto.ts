import { IsNumber, IsString } from "class-validator";
import { UserDto } from "./user.dto";

export class CommentDto {

    @IsString()
    readonly content: string

    @IsString()
    readonly user: UserDto

    @IsNumber()
    readonly post_id: number
}